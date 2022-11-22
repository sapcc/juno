import babel from "@rollup/plugin-babel"
import del from "rollup-plugin-delete"
import pkg from "./package.json"
import minify from "rollup-plugin-babel-minify"
import analyze from "rollup-plugin-analyzer"

if (!/.+\/.+\.js/.test(pkg.module))
  throw new Error(
    "module value is incorrect, use DIR/FILE.js like build/index.js"
  )
const buildDir = pkg.module.slice(0, pkg.module.lastIndexOf("/"))

const config = [
  {
    input: pkg.source,
    output: [
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
      del({ targets: [`${buildDir}/**/*`] }),
      minify({ comments: false }),
      analyze(),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
]

export default config
