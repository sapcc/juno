// convert require to import (cjs to esm)
const require2import = {
  name: "external",
  setup(build) {
    let escape = (text) => `^${text.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")}$`
    let filter = new RegExp(build.initialOptions.external.map(escape).join("|"))
    build.onResolve({ filter: /.*/, namespace: "external" }, (args) => ({
      path: args.path,
      external: true,
    }))
    build.onResolve({ filter }, (args) => ({
      path: args.path,
      namespace: "external",
    }))
    build.onLoad({ filter: /.*/, namespace: "external" }, (args) => {
      return {
        contents: `export * from ${JSON.stringify(args.path)}`,
      }
    })
  },
}

module.exports = require2import
