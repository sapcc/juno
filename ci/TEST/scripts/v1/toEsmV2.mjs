import fs from "fs"
import path from "path"
import child_process from "child_process"
import esbuild from "esbuild"
import cjsToEsm from "./cjs_to_esm_esbuild_plugin.js"

const getStringValues = (json) => {
  let values = []
  Object.keys(json).forEach((key) => {
    if (typeof json[key] === "object") {
      values = values.concat(getStringValues(json[key]))
    } else if (typeof json[key] === "string") {
      values.push(json[key].replace(/"/g, ""))
    }
  })
  return values
}

const getEntryPoints = (packagePath) => {
  if (!fs.existsSync(path.join(packagePath, "package.json"))) return []
  const pkgJson = JSON.parse(
    fs.readFileSync(path.join(packagePath, "package.json"))
  )

  let entryPoints = [pkgJson.main, pkgJson.module]
  if (pkgJson.exports) {
    entryPoints = entryPoints.concat(getStringValues(pkgJson.exports))
  }
  return entryPoints
    .filter((e) => !!e && (e.endsWith(".js") || e.endsWith(".mjs")))
    .map((entryPoint) => path.join(packagePath, entryPoint))
}

// let tmpDir = path.join(__dirname, "TEST")
let tmpDir = "/app/TEST/tmp"
let buildDir = "/app/TEST/build"

fs.rmSync(tmpDir, { recursive: true, force: true })
fs.rmSync(buildDir, { recursive: true, force: true })

fs.mkdirSync(tmpDir, { recursive: true })
fs.mkdirSync(buildDir, { recursive: true })

fs.writeFileSync(
  path.join(tmpDir, "package.json"),
  JSON.stringify({ name: "TEST" }, null, 2)
)

let ignorePackages = []
const ignorePackage = (name, version) => {
  if (ignorePackages.includes(`${name}@${version}`)) return true
  ignorePackages.push(`${name}@${version}`)
}
const shouldIgnorePackage = (name, version) => {
  if (ignorePackages.includes(`${name}@${version}`)) return true
  return false
}

async function buildEsm(packageName, packageVersion = "*") {
  // install package if not already installed
  if (!fs.existsSync(path.join(tmpDir, "node_modules", packageName))) {
    console.log("install", packageName, packageVersion)

    child_process.execSync(`npm install ${packageName}@${packageVersion}`, {
      stdio: [0, 1, 2],
      cwd: tmpDir,
    })
  }

  // determine package path and package.json path
  let pkgPath = path.join(tmpDir, "node_modules", packageName)
  let pkgJsonPath = path.join(pkgPath, "package.json")
  // return if no package.json found
  if (!fs.existsSync(pkgJsonPath)) {
    return { built: false, message: "no package.json found!" }
  }

  // load package.json
  let pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath))

  if (shouldIgnorePackage(pkgJson.name, pkgJson.version)) {
    return { built: false, message: "ignored" }
  }

  if (!pkgJson.main && !pkgJson.module) {
    ignorePackage(pkgJson.name, pkgJson.version)
    return { built: false, message: "no main entry in package.json" }
  }

  // determine output directory
  const outdir = path.resolve(buildDir, `${pkgJson.name}@${pkgJson.version}`)

  // return if already built
  if (fs.existsSync(outdir)) {
    ignorePackage(pkgJson.name, pkgJson.version)
    return { built: true, message: `${pkgJson.name}: already built` }
  }

  let externals = { ...pkgJson.dependencies, ...pkgJson.peerDependencies }

  while (Object.keys(externals).length > 0) {
    const name = Object.keys(externals)[0]
    const version = externals[name]
    delete externals[name]

    const { built, message } = await buildEsm(name, version)

    if (!built) {
      ignorePackage(name, version)
      delete externals[name]
    }
    console.log("build " + name + "@" + version + ":", built, message)
  }

  // console.log("=================EntryPoints", getEntryPoints(pkgPath))

  let success = false
  for (let entryPoint of getEntryPoints(pkgPath)) {
    try {
      console.log(`build ${entryPoint} with ${Object.keys(externals)}`)
      await esbuild.build({
        entryPoints: [entryPoint], //[path.join(pkgPath, pkgJson.main)],
        format: "esm",
        bundle: true,
        // minify: true,
        outdir,
        external: Object.keys(externals),
        plugins: [cjsToEsm],
        logLevel: "silent",
      })
      success = true
    } catch (e) {
      //return { built: true, message: `successfully` }
      // console.log("::::::::::::::: ERROR", packageName, packageVersion, e)
      // return {
      //   built: false,
      //   message: "Could not build:" + pkgJson.name + "@" + pkgJson.version,
      // }
      //console.log("::::::::::::::: ERROR", packageName, packageVersion, e)
    }
  }
  return { built: success, message: success ? "successfully" : "failed" }
}

let packages = {
  react: "18.2.0",
  "react-dom": "18.2.0",
}
console.log("======================build packages:", packages)
Object.keys(packages).forEach(async (packageName) => {
  const { built, message } = await buildEsm(packageName, packages[packageName])
  console.log(
    "build " + packageName + "@" + packages[packageName] + ":",
    built,
    message
  )
})

// fs.writeFileSync(
//   path.join(tmpDir, "package.json"),
//   // JSON.stringify({ dependencies: { react: "^18.2.0" } }, null, 2)
//   JSON.stringify({ dependencies: { react: "*", "react-dom": "*" } }, null, 2)
// )

// child_process.execSync("npm install", { stdio: [0, 1, 2], cwd: tmpDir })

// // for all packages in tmpDir/node_modules
// fs.readdirSync(path.join(tmpDir, "node_modules")).forEach(async (pkg) => {
//   let pkgPath = path.join(tmpDir, "node_modules", pkg)
//   if (fs.statSync(pkgPath).isDirectory()) {
//     let pkgJsonPath = path.join(pkgPath, "package.json")
//     if (fs.existsSync(pkgJsonPath)) {
//       let pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath))
//       // ONLY react for now

//       if (pkgJson.name !== "react" && pkgJson.name !== "react-dom") return
//       console.log("===========proceed", pkgJson.name)

//       if (pkgJson.main) {
//         let pkgMainPath = path.join(pkgPath, pkgJson.main)
//         let pkgMainEsmPath = path.join(
//           tmpDir,
//           "esm",
//           pkgJson.name + "@" + pkgJson.version + ".js"
//         )
//         if (fs.existsSync(pkgMainPath)) {
//           const c = fs.readFileSync(pkgMainPath)
//           // console.log(c.toString())
//           // const { code, map } = await transform(c.toString())
//           // fs.writeFileSync(pkgMainPath, code)

//           // console.log("=============", pkgJson.name, code)
//           const outdir = path.resolve(
//             tmpDir,
//             "esm",
//             `${pkgJson.name}@${pkgJson.version}`
//           )

//           // const result = acorn.parse(c.toString(), {ecmaVersion: 2020})

//           await esbuild.build({
//             entryPoints: [pkgMainPath],
//             format: "esm",
//             bundle: true,
//             minify: true,
//             outdir,
//             plugins: [cjsToEsm],
//           })
//         }
//       }
//     }
//   }
// })

//child_process.execSync("ls -la", { stdio: [0, 1, 2], cwd: tmpDir })
// npm.load(myConfigObject, function (er) {
//   if (er) return handlError(er)
//   npm.commands.install(['some', 'args'], function (er, data) {
//     if (er) return commandFailed(er)
//     // command succeeded, and data might have some info
//   })
//   npm.registry.log.on('log', function (message) { ... })
// })
