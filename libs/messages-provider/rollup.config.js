const babel = require("@rollup/plugin-babel")
const del = require("rollup-plugin-delete")
const pkg = require("./package.json")
const minify = require("rollup-plugin-babel-minify")
const analyze = require("rollup-plugin-analyzer")
const commonjs = require("@rollup/plugin-commonjs")

// IMPORTANT!
// package.json is single source of truth policy

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
        compact: true,
      },
    ],
    plugins: [
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
      del({ targets: [`${buildDir}/**/*`] }),
      minify({ comments: false }),
      analyze({ summaryOnly: true, limit: 0 }),
      commonjs(),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
]

module.exports = config
