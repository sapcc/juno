import fs from "fs"
import path from "path"
import child_process from "child_process"
import esbuild from "esbuild"
import cjsToEsm from "./cjs_to_esm_esbuild_plugin.js"
import requireToImport from "./require_to_import_esbuild_plugin.js"
import glob from "glob"
import { green, red, yellow, blue, cyan } from "./colors.mjs"

function log(...args) {
  process.stdout.write(args.join(" "))
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

  const verbose = (options.verbose || false)

  log("\n" + indent + green("PROCESS: ") + packageName + "@" + packageVersion)

  const currentVersion = getFixPackageVersion(packageName, packageVersion)

  if (verbose)
    log(
      indent,
      blue("INFO:"),
      `current version of ${packageName} is ${currentVersion}`,
      "\n",
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

  // for (let external in externals) {
  //   const { built, ...depResult } = await convertToEsm(
  //     external,
  //     externals[external],
  //     { buildDir, nodeModulesDir, indent: indent + "  ", verbose }
  //   )
  //   if (built) {
  //     result.dependencies[external] = depResult
  //   } else delete externals[external]
  // }
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

      const buildResults = await esbuild.build({
        entryPoints: [entryPoint],
        bundle: true,
        // minify: true,
        metafile: true,
        format: "esm",
        platform: "browser",
        outdir: path.join(buildDir, `${packageName}@${currentVersion}`),
        external: Object.keys(externals || {}),
        plugins: [cjsToEsm, requireToImport],
        target: "esnext",
        keepNames: true,
        ignoreAnnotations: true,
        logLevel: "silent",
      })
      result.built = true

      const entryPointFile = entryPoint.replace(pkgPath, packageName)
      const entryPointName = entryPointFile.replace(/\.m?js$/, "")
      const entryPointPath = Object.keys(buildResults.metafile?.outputs)?.[0]
      // add entrypoint to result without .js extension
      result.entryPoints[entryPointName] = entryPointPath

      if (
        entryPointFile === path.join(packageName, pkgJson.main || "") ||
        entryPoint === path.join(packageName, pkgJson.main || "")
      ) {
        result.entryPoints[packageName] = entryPointPath
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
    result.entryPoints[`${packageName}/`] = path.join(result.path, "/")

    if (verbose) console.log(cyan(JSON.stringify(result, null, 2)))

    fs.writeFileSync(buildLogPath, JSON.stringify(result, null, 2))
  }
  return result
}

export default convertToEsm
