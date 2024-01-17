// const fs = require("fs")
// const path = require("path")
// // const { parse } = require("cjs-module-lexer")
// const { parse } = require("esm-cjs-lexer")
// const { resolve } = require("path")
// const { parseCjsExports } = require("./helper")

// convert named cjs exports to esm
const cjs_to_esm_plugin = {
  name: "cjs-to-esm",
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      if (args.importer === "") return { path: args.path, namespace: "c2e" }
    })
    build.onLoad({ filter: /.*/, namespace: "c2e" }, (args) => {
      const keys = Object.keys(require(args.path)).join(", ")
      const path = JSON.stringify(args.path)
      const resolveDir = __dirname
      return {
        contents: `export { default, ${keys} } from ${path}`,
        resolveDir,
      }
    })
  },
}

module.exports = cjs_to_esm_plugin
