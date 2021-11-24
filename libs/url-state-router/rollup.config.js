import babel from "@rollup/plugin-babel"
import del from "rollup-plugin-delete"
import pkg from "./package.json"
import minify from "rollup-plugin-babel-minify"
import analyze from "rollup-plugin-analyzer"

const config = [
  {
    input: "src/index.js",
    output: [
      {
        file: pkg.main,
        name: "url-state-router",
        format: "cjs",
        sourcemap: true,
        compact: true,
      },
      {
        file: pkg.module,
        format: "esm",
        preserveModules: false,
        compact: true,
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
      del({ targets: ["lib/**/*"] }),
      minify({ comments: false }),
      analyze(),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
]

export default config
