import babel from "@rollup/plugin-babel"
import del from "rollup-plugin-delete"
// import rootImport from "rollup-plugin-root-import"
import pkg from "./package.json"
const fs = require("fs")

const input = {
  index: pkg.source,
}

fs.readdirSync("./src/components").forEach((file) => {
  input[file] = `src/components/${file}/index.js`
})

const config = [
  {
    input,
    entryFileNames: "[name].mjs",
    output: [
      // { dir: "lib", format: "cjs", preserveModules: false },
      { dir: "lib/esm", format: "esm", preserveModules: false },
    ],
    plugins: [
      babel({ exclude: "node_modules/**", babelHelpers: "bundled" }),
      del({ targets: ["lib"] }),
      // rootImport({ root: `${__dirname}/src`, extensions: ".js" }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
]

export default config
