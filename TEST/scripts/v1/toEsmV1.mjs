import fs from "fs"
import path from "path"
import child_process from "child_process"
import esbuild from "esbuild"
import cjsToEsm from "./cjs_to_esm_esbuild_plugin.js"

// let tmpDir = path.join(__dirname, "TEST")
let tmpDir = "/app/TEST/build"

fs.rmSync(tmpDir, { recursive: true, force: true })
fs.mkdirSync(path.resolve(tmpDir, "esm"), { recursive: true })

fs.writeFileSync(
  path.join(tmpDir, "package.json"),
  // JSON.stringify({ dependencies: { react: "^18.2.0" } }, null, 2)
  JSON.stringify({ dependencies: { react: "*", "react-dom": "*" } }, null, 2)
)

child_process.execSync("npm install", { stdio: [0, 1, 2], cwd: tmpDir })

// for all packages in tmpDir/node_modules
fs.readdirSync(path.join(tmpDir, "node_modules")).forEach(async (pkg) => {
  let pkgPath = path.join(tmpDir, "node_modules", pkg)
  if (fs.statSync(pkgPath).isDirectory()) {
    let pkgJsonPath = path.join(pkgPath, "package.json")
    if (fs.existsSync(pkgJsonPath)) {
      let pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath))
      // ONLY react for now

      if (pkgJson.name !== "react" && pkgJson.name !== "react-dom") return
      console.log("===========proceed", pkgJson.name)

      if (pkgJson.main) {
        let pkgMainPath = path.join(pkgPath, pkgJson.main)
        let pkgMainEsmPath = path.join(
          tmpDir,
          "esm",
          pkgJson.name + "@" + pkgJson.version + ".js"
        )
        if (fs.existsSync(pkgMainPath)) {
          const c = fs.readFileSync(pkgMainPath)
          // console.log(c.toString())
          // const { code, map } = await transform(c.toString())
          // fs.writeFileSync(pkgMainPath, code)

          // console.log("=============", pkgJson.name, code)
          const outdir = path.resolve(
            tmpDir,
            "esm",
            `${pkgJson.name}@${pkgJson.version}`
          )

          // const result = acorn.parse(c.toString(), {ecmaVersion: 2020})

          await esbuild.build({
            entryPoints: [pkgMainPath],
            format: "esm",
            bundle: true,
            minify: true,
            outdir,
            plugins: [cjsToEsm],
          })
        }
      }
    }
  }
})

child_process.execSync("ls -la", { stdio: [0, 1, 2], cwd: tmpDir })
// npm.load(myConfigObject, function (er) {
//   if (er) return handlError(er)
//   npm.commands.install(['some', 'args'], function (er, data) {
//     if (er) return commandFailed(er)
//     // command succeeded, and data might have some info
//   })
//   npm.registry.log.on('log', function (message) { ... })
// })
