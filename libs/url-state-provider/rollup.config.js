const terser = require("@rollup/plugin-terser")
const del = require("rollup-plugin-delete")
const fs = require("fs")
const { nodeResolve } = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
let pkg = JSON.parse(fs.readFileSync("./package.json"))

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

const isProduction = process.env.NODE_ENV === "production"
const IGNORE_EXTERNALS = process.env.IGNORE_EXTERNALS === "true"

const config = [
  {
    input: pkg.source,
    output: [
      {
        file: pkg.main,
        name: pkg.name,
        format: "cjs",
        compact: true,
      },
      {
        file: pkg.module,
        format: "esm",
      },
    ],
    plugins: [
      terser(),
      del({ targets: [mainBuildDir, moduleBuildDir] }),
      nodeResolve(),
      commonjs(),
    ],
    external:
      isProduction && !IGNORE_EXTERNALS
        ? Object.keys(pkg.peerDependencies || {})
        : [],
  },
]

module.exports = config
