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

const normalizeVersion = (version) => {
  if (!version) return "latest"
  const newVersion = version
    .split(" ")[0]
    .replace(">", "")
    .replace(">=", "")
    .replace("<", "")
    .replace("<=", "")
    .replace("~", "")
    .replace("^", "")
    .replace("*", "latest")
  // console.log(".....", version, newVersion)
  return newVersion
}

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
  packageRegistry[packageJson.name][packageJson.version || "latest"] = {
    path,
    entryFile,
    entryDir,
    peerDependencies: packageJson.peerDependencies,
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

// console.log("================packageRegistry", packageRegistry)

// create importMap hash
const importMap = { scopes: {}, imports: {} }
const generator = new Generator({ env: ["browser"] })

for (let name in packageRegistry) {
  for (let version in packageRegistry[name]) {
    const packageData = findRegisteredPackage(name, version)

    // move to the next item unless peer dependencies exist
    if (!packageData.peerDependencies) continue

    // PEER DEPENDENCIES EXIST
    // create generator
    // initialize scopes of packageName
    const packageScopePath = `${options.baseUrl}/${packageData.path}/`

    // add package to imports of the importmap
    importMap.imports[`@juno/${name}@${version}`] =
      packageScopePath + packageData.entryFile
    importMap.imports[`@juno/${name}@${version}/`] =
      packageScopePath + packageData.entryDir + "/"

    importMap.scopes[packageScopePath] =
      importMap.scopes[packageScopePath] || {}

    for (let dependencyName in packageData.peerDependencies) {
      let dependencyVersion = packageData.peerDependencies[dependencyName]
      // ownPackage = juno lib
      const ownPackage = findRegisteredPackage(
        dependencyName,
        dependencyVersion
      )

      if (ownPackage) {
        // OWN PACKAGE
        console.log(
          `(-) ${name} install internal dependency ${dependencyName}@${dependencyVersion} from ${ownPackage.path}`
        )

        importMap.scopes[packageScopePath][
          dependencyName + "/"
        ] = `${options.baseUrl}/${ownPackage.path}/${ownPackage.entryDir}/`
        importMap.scopes[packageScopePath][
          dependencyName
        ] = `${options.baseUrl}/${ownPackage.path}/${ownPackage.entryFile}`
      } else {
        // EXTERNAL PACKAGE
        console.log(
          `(+) ${name} install external dependency ${dependencyName}@${dependencyVersion}`
        )
        // build resolution
        await generator.install(`${dependencyName}@${dependencyVersion}`)
        // console.log(JSON.stringify(generator.getMap(), null, 2))

        // build importMap with scopes
        const map = generator.getMap()
        importMap.scopes = {
          ...importMap.scopes,
          ...map.scopes,
          [`${options.baseUrl}/${packageData.path}/`]: {
            ...importMap.scopes[`${options.baseUrl}/${packageData.path}/`],
            ...map.imports,
          },
        }
      }
    }
  }
}

if (options.verbose || options.v) {
  console.log("==============IMPORTMAP==============")
  console.log(JSON.stringify(importMap, null, 2))
}
fs.writeFileSync(options.output, JSON.stringify(importMap, null, 2))
