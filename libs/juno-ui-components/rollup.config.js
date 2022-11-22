import babel from "@rollup/plugin-babel"
import del from "rollup-plugin-delete"
import postcss from "rollup-plugin-postcss"
import pkg from "./package.json"
const fs = require("fs")
import minify from "rollup-plugin-babel-minify"
import analyze from "rollup-plugin-analyzer"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import svgr from "@svgr/rollup"

import parseStyles from "./rollup-plugin-styles-parser"

if (!/.+\/.+\.js/.test(pkg.module))
  throw new Error(
    "module value is incorrect, use DIR/FILE.js like build/index.js"
  )
const buildDir = pkg.module.slice(0, pkg.module.lastIndexOf("/"))

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
        dir: buildDir,
        format: "esm",
        preserveModules: false,
        compact: true,
      },
    ],
    plugins: [
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
      del({ targets: [`${buildDir}/**/*`] }),
      nodeResolve(),
      svgr({
        svgo: false,
        titleProp: true,
      }),
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extract: "styles.css",
        minimize: true,
        inject: false,
        extensions: [".scss", ".css"],
      }),
      parseStyles({
        stylesFileName: "styles",
        theme: require("./tailwind.config").theme,
      }),
      minify({ comments: false }),
      analyze({ skipFormatted: process.env.NODE_ENV === "production" }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
]

export default config
