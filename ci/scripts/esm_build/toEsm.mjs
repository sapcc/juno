import fs from "fs"
import path from "path"
import child_process from "child_process"
import esbuild from "esbuild"
import cjsToEsm from "./cjs_to_esm_esbuild_plugin.js"
import requireToImport from "./require_to_import_esbuild_plugin.js"
import glob from "glob"
import { green, red, yellow, blue, cyan } from "./colors.mjs"

function log(...args) {
  process.stdout.write(...args)
}

function getEntryPoints(packagePath) {
  let files = []
  let pkgJson
  try {
    pkgJson = JSON.parse(
      fs.readFileSync(path.join(packagePath, "package.json"))
    )
    if (pkgJson.main) {
      files.push(path.join(packagePath, pkgJson.main))
    } else if (pkgJson.module) {
      files.push(path.join(packagePath, pkgJson.module))
    }
  } catch (e) {
    console.log(red("ERROR:"), "failed to parse package.json of", packagePath)
    return files
  }
  files = files.concat(
    glob.sync(path.join(packagePath, "*.js"), {
      ignore: "node_modules/**",
    })
  )
  return files
}

function getFixPackageVersion(name, version = "*") {
  if (
    version !== "" &&
    version !== "*" &&
    version !== "latest" &&
    !version.match(/^([><]=?|~|\^)/)
  )
    return version.trim()

  let result
  try {
    result = child_process
      .execSync(`npm show "${name}@${version}" version --json`)
      .toString()
    result = JSON.parse(result)
  } catch (e) {
    console.log(
      red("ERROR:"),
      "failed to get version of " + name + "@" + version
    )
  }
  if (!result) return "latest"
  if (typeof result === "string") return result.trim()
  if (Array.isArray(result)) return result.pop().trim()
}

function installNpmPackage(name, version = "latest", options = {}) {
  const verbose = options.verbose || false

  const nodeModulesDir = options.nodeModulesDir || "/tmp"
  if (version === "*") version = "latest"
  if (!fs.existsSync(nodeModulesDir))
    fs.mkdirSync(nodeModulesDir, { recursive: true })
  if (!fs.existsSync(path.join(nodeModulesDir, "package.json")))
    fs.writeFileSync(
      path.join(nodeModulesDir, "package.json"),
      JSON.stringify({ name: "toEsm" }, null, 2)
    )
  if (verbose) console.log(blue("INFO:"), `install npm "${name}@${version}"`)
  child_process.execSync(`npm install "${name}@${version}" --save-exact`, {
    cwd: nodeModulesDir,
  })
  return path.join(nodeModulesDir, "node_modules", name)
}

async function convertToEsm(packageName, packageVersion, options = {}) {
  const buildDir = path.resolve(options.buildDir || "./build")
  const nodeModulesDir = path.resolve(options.nodeModulesDir || "/tmp")
  const indent = options.indent || ""

  const verbose = options.verbose || false

  log("\n" + indent + green("PROCESS: ") + packageName + "@" + packageVersion)

  const currentVersion = getFixPackageVersion(packageName, packageVersion)

  if (verbose)
    console.log(
      indent,
      blue("INFO:"),
      `current version of ${packageName} is ${currentVersion}`
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

  const entryPoints = getEntryPoints(pkgPath)
  if (verbose) console.log(blue("INFO:"), "entrypoints are", entryPoints)

  const externals = { ...pkgJson.peerDependencies } //{ ...pkgJson.peerDependencies, ...pkgJson.dependencies }
  let externalPackages = {
    [packageName]: `${packageName}@${currentVersion}/${
      pkgJson.main || pkgJson.module
    }`,
  }

  for (let external in externals) {
    const { built, buildName, main, dependencies } = await convertToEsm(
      external,
      externals[external],
      { buildDir, nodeModulesDir, indent: indent + "  ", verbose }
    )
    if (built) {
      externalPackages[external] = {
        main: `${buildName}/${main}`,
        dependencies,
      }
    } else delete externals[external]
  }

  // extend externals to avoid dynamic imports
  // which are handled by requireToImport plugin
  entryPoints.forEach((entryPoint) => {
    const entryPointName = entryPoint
      .replace(pkgPath, packageName)
      .replace(/\.js$/, "")
    externalPackages[entryPointName] = entryPoint.replace(
      pkgPath,
      `${packageName}@${currentVersion}`
    )
  })

  if (verbose)
    console.log(indent, blue("INFO:"), "externals are", externalPackages)

  let built = false

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

      await esbuild.build({
        entryPoints: [entryPoint],
        bundle: true,
        // minify: true,
        format: "esm",
        platform: "browser",
        outdir: path.join(buildDir, `${packageName}@${currentVersion}`),
        external: Object.keys(externalPackages),
        plugins: [cjsToEsm, requireToImport],
        target: "esnext",
        keepNames: true,
        ignoreAnnotations: true,
        logLevel: "silent",
      })
      built = true
      process.stdout.write(green("DONE"))
    } catch (e) {
      log(
        yellow("FAILED") +
          (verbose ? e.message : "") +
          cyan(" -> build in! ") +
          green("DONE")
      )
      // remove it from externalPackages
      delete externalPackages[
        entryPoint.replace(pkgPath, packageName).replace(/\.js$/, "")
      ]
    }
  }

  const result = {
    built,
    buildName: `${packageName}@${currentVersion}`,
    main: pkgJson.main || pkgJson.module,
    dependencies: externalPackages,
  }

  if (built) {
    fs.writeFileSync(buildLogPath, JSON.stringify(result, null, 2))
  }
  return result
}

export default convertToEsm

// const start = Date.now()
// const buildDir = "./TEST/build"
// const nodeModulesDir = "./TEST/tmp"
// fs.rmSync(buildDir, { recursive: true, force: true })
// console.log(clear)
// console.log(yellow("========================START========================"))
// const packages = {
//   "react-dom": "18.2.0",
//   react: "18.2.0",
//   zustand: "*",
//   "@tanstack/react-query": "4.28.0",
//   "custom-event-polyfill": "^1.0.7",
//   luxon: "^2.3.0",
//   "prop-types": "^15.8.1",
// }
// for (let packageName in packages) {
//   const packageVersion = packages[packageName]
//   await convertToEsm(packageName, packageVersion, { buildDir, nodeModulesDir })
// }

// console.log("\n" + yellow("Done in " + (Date.now() - start) / 1000 + "s"))
