const fs = require("fs")
const path = require("path")
// const { parse } = require("cjs-module-lexer")
const { parse } = require("esm-cjs-lexer")
const { resolve } = require("path")
const { parseCjsExports } = require("./helper")

const cjs_to_esm_plugin = {
  name: "cjs-to-esm",
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      // console.log("::::::::::::", args)
      if (args.importer === "") return { path: args.path, namespace: "cjs2esm" }
    })
    build.onLoad({ filter: /.*/, namespace: "cjs2esm" }, async (args) => {
      // console.log("::::::::::::", args)
      //const code = fs.readFileSync(args.path, "utf8")

      // const result = parse(args.path, code)
      // const keys = Object.keys(require(args.path)).join(", ")
      const filePath = JSON.stringify(args.path)
      const resolveDir = __dirname

      // console.log(":::PATH", filePath)
      // console.log(":::EXPORTS, REEXPORTS", result)

      // const namedExports = []
      // namedExports.push(`export { ${result.exports.join(", ")} }`)

      // result.reexports.forEach((reexport) => {
      //   const importPath = path.resolve(args.path, "../", reexport)
      //   const imports = require(importPath)
      //   const importKeys = Object.keys(imports)

      //   if (importKeys.length === 0)
      //     namedExports.push(
      //       `export {default} from ${JSON.stringify(importPath)}`
      //     )
      //   else
      //     namedExports.push(
      //       `export { default, ${importKeys.join(", ")} } from ${JSON.stringify(
      //         importPath
      //       )}`
      //     )
      // })

      // console.log("===", namedExports.join("\n"))
      // console.log(":::----", keys)

      // let namedExports2 = await parseCjsExports({
      //   cwd: args.path,
      //   importPath: path.resolve(args.path, "../"),
      // })

      // namedExports2 = `
      // export { default, ${namedExports2.exports.join(", ")} } from ${filePath}`

      // console.log("------------------------")
      // console.log(":::", namedExports2)
      // console.log("---", `export { default, ${keys} } from ${filePath}`)
      // console.log(
      //   "cjs-to-esm",
      //   args,
      //   `export export { default, ${keys} } from ${path}`
      // )

      // return {
      //   contents: `export { default, ${keys} } from ${filePath}`,
      //   resolveDir,
      // }

      return {
        contents: namedExports2,
        //resolveDir: path.dirname(args.path), //resolveDir,
        resolveDir,
      }

      //   console.log(`
      //   import * as m from ${filePath};
      //   import { ${keys} } from ${filePath};
      //   export { ${keys} };
      //   export default m;
      // `)

      //   return {
      //     contents: `
      //       import * as m from ${filePath};
      //       import { ${keys} } from ${filePath};
      //       export { ${keys} };
      //       export default m;
      //     `,
      //     resolveDir,
      //   }
    })
  },
}

module.exports = cjs_to_esm_plugin
