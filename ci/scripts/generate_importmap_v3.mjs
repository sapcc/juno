/** @module ImportMap */
/**
 * This module generates importmap to be used in browser to share libs between juno apps.
 * It uses the jspm generator to resolve dependencies, build the importmap and download the
 * appropriate files.
 * In the end, all dependencies listed in the import map are loaded from the juno Assets Server.
 */

import glob from "glob"
import fs from "fs"
import pathLib from "path"
import url from "url"
// import { exit } from "node:process"

// ignore-externals allows us to bundle all libs into one final file.
// For the case the CDN with the external libs is unreachable, this flag must be set to true.
// This will include all dependencies in the final bundle.
const availableArgs = [
  "--exit-on-error=[true|false]",
  "--src=DIR_PATH",
  "--output=FILE_PATH",
  "--ignore-externals=true|false",
  "--base-url=URL_OF_ASSETS_SERVER",
  "--external-path=PATH_TO_EXTERNALS_ON_LOCAL_MACHINE",
  "--verbose|-v",
  "--env=[production|development]",
  "--help|-h",
]

// default argument values
const options = {
  provider: "jspm",
  exitOnError: true,
  src: pathLib.dirname(url.fileURLToPath(import.meta.url)),
  baseUrl: "%BASE_URL%",
  output: "./importmap.json",
  ignoreExternals: false,
  externalPath: "externals",
  local: true,
  verbose: false,
  v: false,
  env: "production",
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

    if (options[key] === "true") options[key] = true
    if (options[key] === "false") options[key] = false
    continue
  }
}
if (options.help || options.h) {
  console.log(`Usage: node ${process.argv[1]} ` + availableArgs.join(" "))
}

const PACKAGES_PATHS = ["apps", "libs"]
const rootPath = pathLib.resolve(options.src)
const globPattern = `${rootPath}/@(${PACKAGES_PATHS.join("|")})/**/package.json`
const pathRegex = new RegExp(`^${rootPath}/(.+)/package.json$`)
const files = glob.sync(globPattern, { ignore: [`node_modules/**`] })

// build package registry based on juno packages
const packageRegistry = {}

// this timestamp will be added to the index.js files for own libs
const timestamp = Date.now()

for (let file of files) {
  // load and parse package.json
  let pkg = JSON.parse(fs.readFileSync(file))

  const entryFile = pkg.module || pkg.main || "index.js"
  const entryDir = entryFile.slice(0, entryFile.lastIndexOf("/") + 1) || "/"
  const path = file.replace(pathRegex, "$1")
  const version = path.indexOf("@latest") > 0 ? "latest" : pkg.version

  packageRegistry[pkg.name] = { ...packageRegistry[pkg.name] }

  packageRegistry[pkg.name][version] = {
    name: pkg.name,
    version,
    path,
    entryFile: entryFile + "?" + timestamp,
    entryDir,
    peerDependencies: options.ignoreExternals ? false : pkg.peerDependencies,
    importmapExtras: pkg.importmapExtras || {},
  }
}

// console.log(packageRegistry)
// process.exit(0)

// find registered package
// version can be a "*". If it is a "*" it will be mapped to "latest"
const findRegisteredPackage = (name, version) =>
  (packageRegistry[name] || {})[version === "*" ? "latest" : version]

// console.log("================packageRegistry", packageRegistry)

// create importMap hash
const importMap = { scopes: {}, imports: {} }

const mergePkgImportMaps = (pkgPath, pkgImportMaps) => {
  // do nothing unless pkgImportMaps contains any data
  if (!pkgImportMaps || pkgImportMaps.length === 0) return

  // ensure package scope is created
  importMap.scopes[pkgPath] = { ...importMap.scopes[pkgPath] }

  /*
    pkgImportMaps looks like:
    [
      {
        "imports": {
          "react": "URL"
        }, 
        "scopes": {
          "scope1": {
            "pkg1": "URL",
            "pk2": "URL",
            ...
          },
          "scope2": {
            ...
          }
        }
      }
    ]
    The "imports" map contains exact one package
  */
  for (let pkgImportMap of pkgImportMaps) {
    if (!pkgImportMap.imports) continue
    // get name of the imported package
    const depPkgName = Object.keys(pkgImportMap.imports)[0]
    // the url or path to that package
    const depPkgPath = pkgImportMap.imports[depPkgName]

    if (
      importMap.scopes[pkgPath][depPkgName] &&
      importMap.scopes[pkgPath][depPkgName] !== depPkgPath
    ) {
      // SHOULD NEVER HAPPEN
      console.log("===IMPORT CONFLICT", pkgPath, depPkgName)
    }
    // add imported package to the main package scope
    importMap.scopes[pkgPath][depPkgName] = depPkgPath

    // merge scopes
    for (let depScopeName in pkgImportMap.scopes) {
      importMap.scopes[depScopeName] = { ...importMap.scopes[depScopeName] }
      for (let depScopePkgName in pkgImportMap.scopes[depScopeName]) {
        // console.log(depScopePkgName)
        const depScopePkgPath =
          pkgImportMap.scopes[depScopeName][depScopePkgName]

        // Detect conflicts
        // Conflict exists if a scope with same package name
        // already exists in the importMap
        if (
          importMap.scopes[depScopeName][depScopePkgName] &&
          importMap.scopes[depScopeName][depScopePkgName] !== depScopePkgPath
        ) {
          console.log(
            "\x1b[31m%s\x1b[0m",
            `=== SCOPE CONFLICT: ${depScopePkgName} with different version already registered in ${depScopeName}`
          )
          // fix this conflict by creating a new scope based on
          // the path of the imported package
          const newDepScopeName = depPkgPath.slice(
            0,
            depPkgPath.lastIndexOf("/") + 1
          )

          importMap.scopes[newDepScopeName] = {
            [depScopePkgName]: depScopePkgPath,
          }
          console.log(
            "\x1b[32m%s\x1b[0m",
            `    RESOLVED: add ${depScopePkgName} to ${newDepScopeName}`
          )
        } else {
          importMap.scopes[depScopeName][depScopePkgName] = depScopePkgPath
        }
      }
    }
  }
}

const packageURLs = {}

/**
 * This function gets package dependencies from jspm and
 * stores them in packageURLs map
 * @param {string} name of the package, can contain version
 * @returns {object} importmap
 */
const installPackage = async (name) => {
  const generator = new Generator({
    env: [options.env, "browser"],
    defaultProvider: options.provider,
  })
  await generator.install(name)

  // register external deps for download
  if (options.local) {
    const html = await generator.htmlInject(`<!doctype html>`, {
      comment: false,
      preload: true,
    })

    // store urls of all dep packages
    const matches = [
      ...html.matchAll(/<link rel="modulepreload" href="(.+)" \/>/g),
    ]
    matches.forEach((m) => (packageURLs[m[1]] = true))
  }

  return generator.getMap()
}

/**
 * This function downloads a remote package from jspm to local path
 * @param {string} url
 * @param {string} path
 * @returns void
 */
const downloadFile = (url, path, maxRetries = 10, currentRetry = 0) => {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(pathLib.dirname(path), { recursive: true })
    const file = fs.createWriteStream(path)
    const req = https.get(url, (response) => {
      console.log("[generate_importmap]::downloadFile: success with url:", url)
      response.pipe(file)
      // The whole response has been received. Print out the result.
      response.on("end", () => {
        file.close()
        resolve()
      })
    })

    req.on("error", (error) => {
      if (currentRetry < maxRetries) {
        console.error(
          `[generate_importmap]::downloadFile: attempt ${
            currentRetry + 1
          } failed. Retrying:`,
          url
        )
        // Retry after a delay (you can adjust the delay as needed)
        setTimeout(() => {
          resolve(downloadFile(url, path, maxRetries, currentRetry + 1))
        }, 2000) // 2000 milliseconds (2 second) delay in this example
      } else {
        // Maximum retries reached, reject the promise
        console.error(
          `[generate_importmap]::downloadFile: max retries (${maxRetries}) reached. Error: ${error.message}`
        )
        reject(error)
      }
    })

    req.end()
  })
}

const start = async () => {
  console.log("CREATE IMPORTMAP")
  for (let name in packageRegistry) {
    for (let version in packageRegistry[name]) {
      // registered package data
      const regPkg = findRegisteredPackage(name, version)

      // scope for juno packages
      // Example: %BASE_URL%/apps/dashboard@latest/
      const pkgPath = `${options.baseUrl}/${regPkg.path}/`
      // import name e.g. @juno/PACKAGE_NAME@VERSION
      const pkgImportName = `@juno/${name}@${version}`

      // add packages to imports under @juno prefix
      importMap.imports[pkgImportName] = pkgPath + regPkg.entryFile
      importMap.imports[pkgImportName + "/"] = pkgPath + regPkg.entryDir

      // move to the next item unless peer dependencies exist
      if (!regPkg.peerDependencies && !regPkg.importmapExtras) continue

      // create scope for current package path
      importMap.scopes[pkgPath] = { ...importMap.scopes[pkgPath] }

      // container ro collect all dependency importmaps
      const pkgImportMaps = []

      for (let depName in regPkg.peerDependencies) {
        let depVersion = regPkg.peerDependencies[depName]

        // in peer dependencies could our libs contain a url as version.
        // in this case we try to extract the version from url.
        // Example: "oauth": "https://assets.juno.global.cloud.sap/libs/oauth@1.0.0/package.tgz" -> "libs/oauth@1.0.0/build/index.js"
        if (depVersion.startsWith("http")) {
          const versionMatch = depVersion.match(/^http.*@([^/]+).*$/)
          if (versionMatch) depVersion = versionMatch[1]
        }
        // ownPackage = juno lib
        const ownPackage = findRegisteredPackage(depName, depVersion)

        if (ownPackage) {
          /* OWN PACKAGE -> add it to the package dependencies
          Example: {
            "%BASE_URL%/apps/dashboard/": {
              "juno-ui-components": "%BASE_URL%/libs/juno-ui-components@VERSION/build/index.js"
            }
          }
         */
          console.log(
            "\x1b[33m%s\x1b[0m",
            `(-) ${name}@${version} install internal dependency ${ownPackage.name}@${ownPackage.version} from ${ownPackage.path}`
          )

          importMap.scopes[pkgPath][
            `${ownPackage.name}/`
          ] = `${options.baseUrl}/${ownPackage.path}/${ownPackage.entryDir}`
          importMap.scopes[pkgPath][
            ownPackage.name
          ] = `${options.baseUrl}/${ownPackage.path}/${ownPackage.entryFile}`
        } else {
          // EXTERNAL PACKAGE -> use generator to get all dependencies
          console.log(
            "\x1b[36m%s\x1b[0m",
            `(+) ${name}@${version} install external dependency ${depName}@${depVersion}`
          )

          try {
            // get the importmap for current dependency
            const map = await installPackage(`${depName}@${depVersion}`)
            // save importmap
            pkgImportMaps.push(map)

            // Fix react-dom/client dependency
            if (depName === "react-dom" && depVersion >= "18.2") {
              console.log(
                "\x1b[33m%s\x1b[0m",
                `(!) ${name}@${version} FIX react-dom, add react-dom/client`
              )
              const map = await installPackage(`react-dom@${depVersion}/client`)
              pkgImportMaps.push(map)
            }
          } catch (error) {
            console.log(error)
            if (options.exitOnError) process.exit(1)
          }
        }
      }

      if (regPkg.importmapExtras) {
        for (let dep in regPkg.importmapExtras) {
          const version = regPkg.importmapExtras[dep]
          const [_, name, subPath] = dep.match(/^(.+)\/([^\/]+)$/)
          console.log(
            "\x1b[33m%s\x1b[0m",
            `(!) ${regPkg.name}@${regPkg.version} install extra package: ${name}@${version}/${subPath}`
          )
          const map = await installPackage(`${name}@${version}/${subPath}`)
          pkgImportMaps.push(map)
        }
      }

      mergePkgImportMaps(pkgPath, pkgImportMaps)
    }
  }

  if (options.verbose || options.v) {
    console.log("==============IMPORTMAP==============")
    console.log(JSON.stringify(importMap, null, 2))
  }

  let importMapString = JSON.stringify(importMap, null, 2)

  // link deps in importmap to local
  if (options.local) {
    // replace jspm host with locals host placeholder
    importMapString = importMapString.replaceAll(
      "https://ga.jspm.io",
      `${options.baseUrl}/${options.externalPath}`
    )

    console.log("download packages to", options.externalPath)
    fs.rmSync(options.externalPath, { recursive: true, force: true })
    fs.mkdirSync(options.externalPath, { recursive: true })
    Object.keys(packageURLs).forEach((url) => {
      const path = url.replace("https://ga.jspm.io", options.externalPath)
      downloadFile(url, path)
      try {
        const mapPath = (src) => src.replace(/\.(m?js)$/, ".$1.map")
        // download source map
        // for that we have to replace .js with .js.map on the end
        downloadFile(mapPath(url), mapPath(path))
      } catch (e) {
        console.warn(e)
      }
    })
  }
  console.log("Write importmap to ", options.output)

  fs.writeFileSync(options.output, importMapString)
}

start()
