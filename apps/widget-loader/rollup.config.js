const del = require("rollup-plugin-delete")
const pkg = require("./package.json")
const minify = require("rollup-plugin-babel-minify")
const analyze = require("rollup-plugin-analyzer")

if (!/.+\/.+\.js/.test(pkg.module))
  throw new Error(
    "module value is incorrect, use DIR/FILE.js like build/index.js"
  )
const buildDir = pkg.module.slice(0, pkg.module.lastIndexOf("/"))
const IGNORE_EXTERNALS = process.env.IGNORE_EXTERNALS === "true"

const config = [
  {
    input: pkg.source,
    output: [
      {
        file: pkg.module,
        format: "esm",
      },
    ],
    plugins: [
      del({ targets: [`${buildDir}/**/*`] }),
      minify({ comments: false }),
      analyze(),
    ],
    external: IGNORE_EXTERNALS ? [] : Object.keys(pkg.peerDependencies || {}),
  },
]

module.exports = config
