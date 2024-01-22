import fs from "fs"
import path from "path"
import child_process from "child_process"
import esbuild from "esbuild"
import cjsToEsm from "./cjs_to_esm_esbuild_plugin.js"
import requireToImport from "./require_to_import_esbuild_plugin.js"
import glob from "glob"
import https from "node:https"
import semver from "semver"
import { green, red, yellow, blue, cyan } from "./colors.mjs"

function log(...args) {
  process.stdout.write(args.join(" "))
}

// all js files found in the package root directory are potential entry points
// files pointed to by the main and module fields in the package.json are also entry points
function getEntryPoints(packagePath) {
  let files = []
  let pkgJson
  try {
    pkgJson = JSON.parse(
      fs.readFileSync(path.join(packagePath, "package.json"))
    )
    // add main and module entry points
    if (pkgJson.main) {
      files.push(path.join(packagePath, pkgJson.main))
    } else if (pkgJson.module) {
      files.push(path.join(packagePath, pkgJson.module))
    }
  } catch (e) {
    console.log(red("ERROR:"), "failed to parse package.json of", packagePath)
    return files
  }
  // add all js files in the package root directory
  files = files.concat(
    glob.sync(path.join(packagePath, "*.js"), {
      ignore: "node_modules/**",
    })
  )
  return files
}

// get fix version of a package
async function getFixPackageVersion(name, version = "*") {
  // return version if version is not a range
  if (
    version !== "" &&
    version !== "*" &&
    version !== "latest" &&
    !version.match(/^([><]=?|~|\^)/)
  )
    return version.trim()

  // make an api call to npm to get the latest version
  return new Promise((resolve, reject) => {
    const req = https
      .get(
        `https://registry.npmjs.org/${name}`,
        {
          headers: {
            Accept: "application/vnd.npm.install-v1+json",
            timeout: 300000,
          },
        }, // this header makes the response smaller
        (res) => {
          // iniiialize data
          let data = ""

          // add received data to data
          res.on("data", (d) => (data += d))
          // resolve the promise when the response ends
          res.on("end", () => {
            try {
              // get all versions
              const versions = Object.keys(JSON.parse(data).versions)
              // get the latest version that satisfies the version range
              const currentVersion = semver.maxSatisfying(versions, version)
              // resolve the promise
              resolve(currentVersion)
            } catch (e) {
              console.error(
                "\n=========================ERROR: parse version",
                name,
                version
              )
              console.warn(e)
              //reject(e)
              return version
            }
          })
        }
      )
      .on("error", (e) => {
        console.log(
          "\n=========================ERROR: connection error",
          name,
          version
        )
        console.error(e)
        //reject(e)
        return version
      })
    req.end()
  })
}

// use npm to install a package
function installNpmPackage(name, version = "latest", options = {}) {
  const verbose = options.verbose || false

  // cached downloaded packages default to /tmp
  const nodeModulesDir = options.nodeModulesDir || "/tmp"
  if (version === "*") version = "latest"
  if (!fs.existsSync(nodeModulesDir))
    fs.mkdirSync(nodeModulesDir, { recursive: true })
  if (!fs.existsSync(path.join(nodeModulesDir, "package.json")))
    fs.writeFileSync(
      path.join(nodeModulesDir, "package.json"),
      JSON.stringify({ name: "esmBuild", version: "1.0.0" }, null, 2)
    )
  if (verbose) console.log(blue("INFO:"), `install npm "${name}@${version}"`)
  child_process.execSync(
    `npm install "${name}@${version}" --save-exact --legacy-peer-deps`,
    {
      cwd: nodeModulesDir,
    }
  )
  return path.join(nodeModulesDir, "node_modules", name)
}

async function convertToEsm(packageName, packageVersion, options = {}) {
  const buildDir = path.resolve(options.buildDir || "./build")
  const nodeModulesDir = path.resolve(options.nodeModulesDir || "/tmp")
  const indent = options.indent || ""

  const verbose = options.verbose || false

  log("\n" + indent + green("PROCESS: ") + packageName + "@" + packageVersion)

  const currentVersion = await getFixPackageVersion(packageName, packageVersion)

  if (verbose)
    log(
      indent,
      blue("INFO:"),
      `current version of ${packageName} is ${currentVersion}`,
      "\n"
    )

  const buildLogPath = path.join(
    buildDir,
    `${packageName}@${currentVersion}`,
    ".build.log.json"
  )

  if (fs.existsSync(buildLogPath)) {
    return JSON.parse(fs.readFileSync(buildLogPath).toString())
  }

  const pkgPath = installNpmPackage(packageName, currentVersion, {
    nodeModulesDir,
  })
  const pkgJson = JSON.parse(
    fs.readFileSync(path.join(pkgPath, "package.json"))
  )
  const mainFile = pkgJson.main || "index.js"
  const moduleFile = pkgJson.module || "index.mjs"

  const entryPoints = getEntryPoints(pkgPath)
  if (verbose) console.log(blue("INFO:"), "entrypoints are", entryPoints)

  const externals = { ...pkgJson.peerDependencies } //{ ...pkgJson.peerDependencies, ...pkgJson.dependencies }

  const result = {
    built: false,
    name: packageName,
    entryPoints: {},
    dependencies: {},
  }

  // convert externals parallel
  const results = await Promise.all(
    Object.keys(externals).map((external) =>
      convertToEsm(external, externals[external], {
        buildDir,
        nodeModulesDir,
        indent: indent + "  ",
        verbose,
      })
    )
  )

  results.forEach(({ built, ...depResult }) => {
    if (built) {
      result.dependencies[depResult.name] = depResult
    } else delete externals[depResult.name]
  })

  if (verbose) console.log(blue("INFO:"), "externals are", externals)

  for (let entryPoint of entryPoints) {
    try {
      process.stdout.write(
        "\n" +
          indent +
          "  " +
          blue("CONVERT: ") +
          entryPoint.replace(pkgPath, packageName) +
          " to esm "
      )

      const packagesToIgnore = [
        ...Object.keys(externals || {}),
        ...entryPoints.map((e) =>
          e.replace(pkgPath, packageName).replace(/\.m?js$/, "")
        ),
      ]
      let entryPointPath

      // handle type="module" (already esm module)
      if (pkgJson.type === "module") {
        const entryPointName = entryPoint.replace(
          pkgPath,
          `${packageName}@${currentVersion}`
        )
        fs.mkdirSync(path.join(buildDir, path.dirname(entryPointName)), {
          recursive: true,
        })
        fs.copyFileSync(entryPoint, path.join(buildDir, entryPointName))
        entryPointPath = path.join(path.basename(buildDir), entryPointName)
      } else {
        const buildResults = await esbuild.build({
          entryPoints: [entryPoint],
          bundle: true,
          minify: true,
          metafile: true,
          format: "esm",
          platform: "browser",
          outdir: path.join(buildDir, `${packageName}@${currentVersion}`),
          external: packagesToIgnore,
          plugins: [cjsToEsm, requireToImport],
          target: "esnext",
          keepNames: true,
          ignoreAnnotations: true,
          logLevel: "silent",
        })
        entryPointPath = Object.keys(buildResults.metafile?.outputs)?.[0]
      }
      result.built = true

      const entryPointFile = entryPoint.replace(pkgPath, packageName)
      const entryPointName = entryPointFile.replace(/\.m?js$/, "")

      // handle main entrypoint
      // if entrypoint matches main or module file then add
      // the package name as entrypoint pointing to the main file
      if (
        entryPointFile ===
          path.join(packageName, mainFile || moduleFile || "") ||
        entryPoint === path.join(packageName, mainFile || moduleFile || "")
      ) {
        result.entryPoints[packageName] = entryPointPath
        result.main = entryPointName
      } else {
        // else add entrypoint to result without .js extension
        // add entrypoint to result without .js extension
        result.entryPoints[entryPointName] = entryPointPath
      }

      process.stdout.write(green("DONE"))
    } catch (e) {
      log(
        yellow("FAILED") +
          (verbose ? e.message : "") +
          cyan(" -> ignore this entrypoint ") +
          green("DONE")
      )
      if (verbose) console.log(e)
    }
  }

  if (result.built) {
    result.buildName = `${packageName}@${currentVersion}`
    result.path = path.join(
      path.basename(buildDir),
      `${packageName}@${currentVersion}`
    )

    if (verbose) console.log(cyan(JSON.stringify(result, null, 2)))

    fs.writeFileSync(buildLogPath, JSON.stringify(result, null, 2))
  }
  return result
}

export default convertToEsm
