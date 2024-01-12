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
import convertToEsm from "./toEsm.mjs"
import { green, red, yellow, blue, cyan } from "./colors.mjs"

function log(...args) {
  process.stdout.write(args.join(" "))
}

// import { exit } from "node:process"

// ignore-externals allows us to bundle all libs into one final file.
// For the case the CDN with the external libs is unreachable, this flag must be set to true.
// This will include all dependencies in the final bundle.
const availableArgs = [
  "--exit-on-error=[true|false]",
  "--src=DIR_PATH",
  "--output=FILE_PATH",
  "--minify=true|false",
  "--ignore-externals=true|false",
  "--base-url=URL_OF_ASSETS_SERVER",
  "--external-path=PATH_TO_EXTERNALS_ON_LOCAL_MACHINE",
  "--verbose|-v",
  "--env=[production|development]",
  "--help|-h",
]

// default argument values
const options = {
  exitOnError: true,
  src: pathLib.dirname(url.fileURLToPath(import.meta.url)),
  baseUrl: "%BASE_URL%",
  output: "./importmap.json",
  minify: false,
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

// #########################################################################

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

  packageRegistry[pkg.name] = packageRegistry[pkg.name] || {}

  packageRegistry[pkg.name][version] = {
    name: pkg.name,
    version,
    path,
    entryFile: entryFile + "?" + timestamp,
    entryDir,
    peerDependencies: options.ignoreExternals ? false : pkg.peerDependencies,
  }
}

const importMap = { scopes: {}, imports: {} }

// Due to the backward compatibility, we need to add the "old" url to importmap
// to link it to the built version.
// download convert es-module-shim to esm
const buildResult = await convertToEsm("es-module-shims", "1.6.2", {
  buildDir: options.externalPath,
  verbose: options.verbose,
  nodeModulesPath: "./tmp2",
})

fs.cpSync(
  pathLib.join(options.externalPath, buildResult.buildName),
  pathLib.join(options.externalPath, `npm:${buildResult.buildName}`),
  { recursive: true, overwrite: true }
)
// end add es-module-shim

for (let name in packageRegistry) {
  for (let version in packageRegistry[name]) {
    const pkg = packageRegistry[name][version]
    const pkgScopeKey = `${options.baseUrl}/${pkg.path}`
    // console.log(pkg.name, pkg.version, pkg.path)

    log(cyan(`add ${pkg.name}@${pkg.version} to import map` + "\n"))

    importMap.imports[
      `@juno/${pkg.name}@${pkg.version}/`
    ] = `${options.baseUrl}/${pkg.path}/${pkg.entryDir}`
    importMap.imports[
      `@juno/${pkg.name}@${pkg.version}`
    ] = `${options.baseUrl}/${pkg.path}/${pkg.entryFile}`

    if (!pkg.peerDependencies) {
      continue
    }

    for (let depName in pkg.peerDependencies) {
      const depVersion = pkg.peerDependencies[depName]
      const ownPackage =
        packageRegistry[depName]?.[depVersion === "*" ? "latest" : depVersion]

      if (ownPackage) {
        log(
          yellow(
            `(-) ${name}@${version} add internal dependency ${ownPackage.name}@${ownPackage.version} from ${ownPackage.path}` +
              "\n"
          )
        )

        importMap.scopes[`${pkgScopeKey}/`] = {
          ...importMap.scopes[`${pkgScopeKey}/`],
        }
        importMap.scopes[`${pkgScopeKey}/`][
          `${ownPackage.name}/`
        ] = `${options.baseUrl}/${ownPackage.path}/${ownPackage.entryDir}`
        importMap.scopes[`${pkgScopeKey}/`][
          ownPackage.name
        ] = `${options.baseUrl}/${ownPackage.path}/${ownPackage.entryFile}`
        continue
      }

      log(
        green(
          `(+) ${name}@${version} add external dependency ${depName}@${depVersion}` +
            "\n"
        )
      )

      const buildResult = await convertToEsm(depName, depVersion, {
        buildDir: options.externalPath,
        verbose: options.verbose,
        nodeModulesPath: "./tmp2",
      })
      // console.log(JSON.stringify(buildResult, null, 2))

      const addDependenciesRecursive = (externalDependency = {}) => {
        if (externalDependency.entryPoints) {
          for (let entryPoint in externalDependency.entryPoints) {
            importMap.scopes[`${pkgScopeKey}/`] = {
              ...importMap.scopes[`${pkgScopeKey}/`],
            }
            importMap.scopes[`${pkgScopeKey}/`][
              entryPoint
            ] = `${options.baseUrl}/${externalDependency.entryPoints[entryPoint]}`
          }
        }
        if (externalDependency.dependencies) {
          for (let dep in externalDependency.dependencies) {
            addDependenciesRecursive(externalDependency.dependencies[dep])
          }
        }
      }

      addDependenciesRecursive(buildResult)
    }
  }
  //  const packageRegistry[pkg] = Object.values(packageRegistry[pkg])
}

if (options.verbose) console.log(importMap)
fs.writeFileSync(options.output, JSON.stringify(importMap, null, 2))
