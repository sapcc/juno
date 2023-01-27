const { babel } = require("@rollup/plugin-babel")
const del = require("rollup-plugin-delete")
const postcss = require("rollup-plugin-postcss")
const pkg = require("./package.json")
const fs = require("fs")
const minify = require("rollup-plugin-babel-minify")
const analyze = require("rollup-plugin-analyzer")
const { nodeResolve } = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
const svgr = require("@svgr/rollup")

// IMPORTANT!
// package.json is single source of truth policy

if (!/.+\/.+\.js/.test(pkg.module))
  throw new Error(
    "module value is incorrect, use DIR/FILE.js like build/index.js"
  )
const buildDir = pkg.module.slice(0, pkg.module.lastIndexOf("/"))
// filename is extracted from module key in package.json
// because of single source of truth policy
const filename = pkg.module.slice(
  pkg.module.lastIndexOf("/") + 1,
  pkg.module.lastIndexOf(".")
)

const input = {
  [filename]: pkg.source,
}

fs.readdirSync("./src/components").forEach((file) => {
  input[file] = `src/components/${file}/index.js`
})

const isProduction = process.env.NODE_ENV === "production"
const IGNORE_EXTERNALS = process.env.IGNORE_EXTERNALS === "true"

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
      nodeResolve(),
      babel({
        babelHelpers: "bundled",
      }),
      del({ targets: [`${buildDir}/**/*`] }),
      svgr({
        svgo: false,
        titleProp: true,
      }),
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extract: false,
        minimize: true,
        inject: false,
        extensions: [".scss", ".css"],
      }),
      commonjs(),
      minify({ comments: false }),
      analyze({
        summaryOnly: true,
        limit: 0,
      }),
    ],

    external: ["react", "react-dom", "prop-types"].concat(
      isProduction && !IGNORE_EXTERNALS
        ? Object.keys(pkg.peerDependencies || {})
        : []
    ),
  },
  {
    input: "lib/variables.scss",
    output: {
      file: `${buildDir}/lib/variables.css`,
    },
    plugins: [
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extract: true,
        minimize: true,
        inject: false,
      }),
    ],
  },
  {
    input: "tailwind.config.js",
    output: {
      file: `${buildDir}/lib/tailwind.config.js`,
    },
  },
]

module.exports = config
