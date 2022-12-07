const babel = require("@rollup/plugin-babel")
const del = require("rollup-plugin-delete")
const postcss = require("rollup-plugin-postcss")
const pkg = require("./package.json")
const fs = require("fs")
const minify = require("rollup-plugin-babel-minify")
const analyze = require("rollup-plugin-analyzer")
const { nodeResolve } = require("@rollup/plugin-node-resolve")
const svgr = require("@svgr/rollup")

const parseStyles = require("./rollup-plugin-styles-parser")

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
    external: Object.keys(pkg.peerDependencies),

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
      analyze({
        summaryOnly: true,
        limit: 0,
      }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
]

module.exports = config
