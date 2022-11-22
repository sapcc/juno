import del from "rollup-plugin-delete"
import pkg from "./package.json"
import minify from "rollup-plugin-babel-minify"
import analyze from "rollup-plugin-analyzer"

if (!/.+\/.+\.js/.test(pkg.main))
  throw new Error(
    "main value is incorrect, use DIR/FILE.js like build/cjs/index.js"
  )
if (!/.+\/.+\.js/.test(pkg.module))
  throw new Error(
    "module value is incorrect, use DIR/FILE.js like build/esm/index.js"
  )
const mainBuildDir = pkg.main.slice(0, pkg.module.lastIndexOf("/"))
const moduleBuildDir = pkg.module.slice(0, pkg.module.lastIndexOf("/"))

const config = [
  {
    input: pkg.source,
    output: [
      {
        file: pkg.main,
        name: pkg.name,
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
      del({ targets: [`${mainBuildDir}/**/*`, `${moduleBuildDir}/**/*`] }),
      minify({ comments: false }),
      analyze(),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
]

export default config
