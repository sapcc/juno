/** @module ImportMap */
/**
 * This module generates importmap to be used in browser to share libs between juno apps.
 */

// glob and @jspm are installed globally! (see ci/Dockerfile.base)
// get root folder of global node modules
import { execSync } from "node:child_process"
const root = execSync("npm root -g").toString().trim()

const glob = await import(`${root}/glob/glob.js`).then((m) => m.default)
const { Generator } = await import(`${root}/@jspm/generator/dist/generator.js`)
import * as fs from "fs"
import path from "path"
import url from "url"

const availableArgs = [
  "--src=DIR_PATH",
  "--output=FILE_PATH",
  "--base-url=URL_OF_ASSETS_SERVER",
  "--verbose|-v",
  "--help|-h",
]

// default argument values
const options = {
  src: path.dirname(url.fileURLToPath(import.meta.url)),
  baseUrl: "%BASE_URL%",
  output: "./importmap.json",
  verbose: false,
  v: false,
}

const args = process.argv.slice(2)

// PARSE ARGS
for (let arg of args) {
  const match = arg.match(/^-{1,2}([^=]+)=?(.*)/)
  if (match) {
    let key = match[1].replace(/\W+(.)/g, function (match, chr) {
      console.log(match, chr)
      return chr.toUpperCase()
    })

    options[key] = match[2] ? match[2] : true
    continue
  }
}
if (options.help || options.h) {
  console.log("Usage: " + availableArgs.join(" "))
}

const PACKAGES_PATHS = ["apps", "libs"]
const rootPath = path.resolve(options.src)
const globPattern = `${rootPath}/@(${PACKAGES_PATHS.join("|")})/**/package.json`
const pathRegex = new RegExp(`^${rootPath}/(.+)/package.json$`)
const files = glob.sync(globPattern, { ignore: [`node_modules/**`] })

// build package registry based on juno packages
const packageRegistry = {}

for (let file of files) {
  let rawdata = fs.readFileSync(file)
  // FROM package.json
  let packageJson = JSON.parse(rawdata)

  const entryFile = packageJson.module || packageJson.main || "index.js"
  const entryDir = entryFile.slice(0, entryFile.lastIndexOf("/")) || ""
  const path = file.replace(pathRegex, "$1")
  // console.log("===================", entryFile)
  // console.log(":::::::::::::::::", entryFile.slice(0, entryFile.lastIndexOf("/")))

  packageRegistry[packageJson.name] = packageRegistry[packageJson.name] || {}
  packageRegistry[packageJson.name][packageJson.version] = {
    path,
    entryFile,
    entryDir,
    peerDependencies: packageJson.peerDependencies,
  }
  packageRegistry[packageJson.name]["latest"] = {
    ...packageRegistry[packageJson.name][packageJson.version],
  }
}

const findRegisteredPackage = (name, version) => {
  const pkg = packageRegistry[name]
  if (!pkg) return null

  if (pkg[version]) return pkg[version]

  // we support "", "*" and "latest"
  const versions = Object.keys(pkg).sort()

  if (!version || version === "*" || version === "latest") {
    const latest = versions[versions.length - 1]
    return pkg[latest]
  }
  return null
}

const junoImportKey = (name, version) => `@juno/${name}@${version}`

// console.log("================packageRegistry", packageRegistry)

// create importMap hash
const importMap = { scopes: {}, imports: {} }
// const generator = new Generator({ env: ["production", "browser"] })
const tmpScopes = []

const tmpImportMaps = []

for (let name in packageRegistry) {
  for (let version in packageRegistry[name]) {
    const packageData = findRegisteredPackage(name, version)

    const pkgImportName = junoImportKey(name, version)
    const pkgPath = `${options.baseUrl}/${packageData.path}/`
    importMap.imports[pkgImportName] = pkgPath + packageData.entryFile
    importMap.imports[pkgImportName + "/"] =
      pkgPath + packageData.entryDir + "/"

    // move to the next item unless peer dependencies exist
    if (!packageData.peerDependencies) continue

    importMap.scopes[pkgPath] = importMap.scopes[pkgPath] || {}
    // const generator = new Generator({ env: ["production", "browser"] })

    const externalPackages = []

    const pkgImportMaps = []
    for (let dependencyName in packageData.peerDependencies) {
      let dependencyVersion = packageData.peerDependencies[dependencyName]
      // ownPackage = juno lib
      const ownPackage = findRegisteredPackage(
        dependencyName,
        dependencyVersion
      )

      if (ownPackage) {
        const dVersion =
          dependencyVersion === "*" ? "latest" : dependencyVersion
        // OWN PACKAGE
        console.log(
          `(-) ${name} install internal dependency ${dependencyName}@${dVersion} from ${ownPackage.path}`
        )

        importMap.scopes[pkgPath][
          dependencyName + "/"
        ] = `${options.baseUrl}/${ownPackage.path}/${ownPackage.entryDir}/`
        importMap.scopes[pkgPath][
          dependencyName
        ] = `${options.baseUrl}/${ownPackage.path}/${ownPackage.entryFile}`
      } else {
        externalPackages.push({
          target: `${dependencyName}@${dependencyVersion}`,
        })
        console.log(
          `(+) ${name} install external dependency ${dependencyName}@${dependencyVersion}`
        )
        const generator = new Generator({ env: ["production", "browser"] })
        await generator.install(`${dependencyName}@${dependencyVersion}`)
        pkgImportMaps.push(generator.getMap())
      }
    }

    tmpImportMaps.push({ pkfPath: pkgPath, pkgImportMaps })
    // await generator.install(externalPackages)
    // let map = generator.getMap()
    // importMap.scopes[pkgPath] = { ...importMap.scopes[pkgPath], ...map.imports }
    // tmpScopes.push({ [pkgPath]: map.scopes })
    // tmpImportMaps.push(map)
  }
}

// merge scopes

for (let tmpImportMap of tmpImportMaps) {
  const pkgPath = tmpImportMap.pkfPath
  const pkgImportMaps = tmpImportMap.pkgImportMaps
  importMap.scopes[pkgPath] = { ...importMap.scopes[pkgPath] }

  for (let pkgImportMap of pkgImportMaps) {
    const depPkgName = Object.keys(pkgImportMap.imports)[0]
    const depPkgPath = pkgImportMap.imports[depPkgName]
    // console.log(depPkgName)
    // console.log(depPkgPath)
    // console.log(pkgImportMap.scopes)
    // console.log("===================")

    if (
      importMap.scopes[pkgPath][depPkgName] &&
      importMap.scopes[pkgPath][depPkgName] !== depPkgPath
    ) {
      console.log("===IMPORT CONFLICT", pkgPath, depPkgName)
    }
    importMap.scopes[pkgPath][depPkgName] = depPkgPath
    for (let depScopeName in pkgImportMap.scopes) {
      importMap.scopes[depScopeName] = { ...importMap.scopes[depScopeName] }
      for (let depScopePkgName in pkgImportMap.scopes[depScopeName]) {
        // console.log(depScopePkgName)
        const depScopePkgPath =
          pkgImportMap.scopes[depScopeName][depScopePkgName]
        if (
          importMap.scopes[depScopeName][depScopePkgName] &&
          importMap.scopes[depScopeName][depScopePkgName] !== depScopePkgPath
        ) {
          console.log(
            "===SCOPE CONFLICT",
            pkgPath,
            depScopeName,
            depScopePkgName
          )
          const newDepScopeName = depPkgPath.slice(
            0,
            depPkgPath.lastIndexOf("/") + 1
          )

          importMap.scopes[newDepScopeName] = {
            [depScopePkgName]: depScopePkgPath,
          }
          console.log(
            "===RESOLVE CONFLICT BY ADDING NEW SCOPE",
            pkgPath,
            newDepScopeName,
            depScopeName,
            depScopePkgName
          )
        } else {
          importMap.scopes[depScopeName][depScopePkgName] = depScopePkgPath
        }
      }
    }
  }

  // // console.log(scopes)
  // for (let tmpScopeKey in scopes) {
  //   for (let scopePkgName in scopes[tmpScopeKey]) {
  //     importMap.scopes[tmpScopeKey] = { ...importMap.scopes[tmpScopeKey] }

  //     if (!importMap.scopes[tmpScopeKey][scopePkgName]) {
  //       importMap.scopes[tmpScopeKey][scopePkgName] =
  //         scopes[tmpScopeKey][scopePkgName]
  //     } else if (
  //       importMap.scopes[tmpScopeKey][scopePkgName] !==
  //       scopes[tmpScopeKey][scopePkgName]
  //     ) {
  //       console.log(
  //         "==============CONFLICT",
  //         importMap.scopes[tmpScopeKey][scopePkgName],
  //         scopes[tmpScopeKey][scopePkgName]
  //       )
  //       // const path = scopes[tmpScopeKey][scopePkgName]
  //       // const newScopeKey = path.slice(0, path.lastIndexOf("/"))
  //       // importMap.scopes[newScopeKey] = {
  //       //   ...importMap.scopes[newScopeKey],
  //       //   [scopePkgName]: path,
  //       // }
  //     } else continue
  //   }
  // }
}

if (options.verbose || options.v) {
  console.log("==============IMPORTMAP==============")
  console.log(JSON.stringify(importMap, null, 2))
}
fs.writeFileSync(
  options.output,
  JSON.stringify(importMap, null, 2)
  // +
  //   "\n================\n" +
  //   JSON.stringify(tmpScopes, null, 2) +
  //   "\n================\n" +
  //   JSON.stringify(tmpImportMaps, null, 2)
)
