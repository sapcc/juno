import babel from "@rollup/plugin-babel"
import del from "rollup-plugin-delete"
import postcss from "rollup-plugin-postcss"
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
    output: [
      // { dir: "lib", format: "cjs", preserveModules: false },
      { dir: "lib/esm", format: "esm", preserveModules: false },
    ],
    plugins: [
      babel({ exclude: "node_modules/**", babelHelpers: "bundled" }),
      del({ targets: ["lib"] }),

      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extract: "styles.css",
        minimize: true,
        inject: false,
        extensions: [".scss"],
      }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
]

export default config
