const terser = require("@rollup/plugin-terser")
const del = require("rollup-plugin-delete")
const analyze = require("rollup-plugin-analyzer")
const fs = require("fs")
let pkg = JSON.parse(fs.readFileSync("./package.json"))

// IMPORTANT!
// package.json is single source of truth policy

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
        compact: true,
      },
    ],
    plugins: [
      terser(),
      del({ targets: [moduleBuildDir, mainBuildDir] }),
      analyze({ summaryOnly: true, limit: 0 }),
    ],
    external: isProduction ? Object.keys(pkg.peerDependencies || {}) : [],
  },
]

module.exports = config
