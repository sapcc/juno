import babel from "@rollup/plugin-babel"
import del from "rollup-plugin-delete"
import postcss from "rollup-plugin-postcss"
import pkg from "./package.json"
const fs = require("fs")
import minify from "rollup-plugin-babel-minify"
import analyze from "rollup-plugin-analyzer"
import { nodeResolve } from "@rollup/plugin-node-resolve"
// import resolve from "rollup-plugin-node-resolve"

const input = {
  index: pkg.source,
}

fs.readdirSync("./src/components").forEach((file) => {
  input[file] = `src/components/${file}/index.js`
})

const config = [
  {
    input,
    output: [
      // { dir: "lib", format: "cjs", preserveModules: false },
      {
        dir: "lib",
        format: "esm",
        preserveModules: false,
        compact: true,
      },
    ],
    plugins: [
      babel({ exclude: "node_modules/**", babelHelpers: "bundled" }),
      del({ targets: ["lib"] }),
      nodeResolve(),
      // resolve(),
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extract: "styles.css",
        minimize: true,
        inject: false,
        extensions: [".scss"],
      }),
      minify(),
      analyze(),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
]

export default config
