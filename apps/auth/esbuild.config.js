const esbuild = require("esbuild")
const fs = require("node:fs/promises")
const pkg = require("./package.json")
const postcss = require("postcss")
const sass = require("sass")
// this function generates app props based on package.json and propSecrets.json
const appProps = require("../../helpers/appProps")

if (!/.+\/.+\.js/.test(pkg.module))
  throw new Error(
    "module value is incorrect, use DIR/FILE.js like build/index.js"
  )

const isProduction = process.env.NODE_ENV === "production"
const IGNORE_EXTERNALS = process.env.IGNORE_EXTERNALS === "true"
// in dev environment we prefix output file with public
let outfile = `${isProduction ? "" : "public/"}${pkg.main || pkg.module}`
// get output from outputfile
let outdir = outfile.slice(0, outfile.lastIndexOf("/"))
const args = process.argv.slice(2)
const watch = args.indexOf("--watch") >= 0
const serve = args.indexOf("--serve") >= 0

const green = "\x1b[32m%s\x1b[0m"
const yellow = "\x1b[33m%s\x1b[0m"
const clear = "\033c"

const build = async () => {
  // delete build folder and re-create it as an empty folder
  await fs.rm(outdir, { recursive: true, force: true })
  await fs.mkdir(outdir, { recursive: true })

  // build app
  let ctx = await esbuild.context({
    bundle: true,
    minify: isProduction,
    // target: ["es2020"],
    target: ["es2020"], //["chrome64", "firefox67", "safari11.1", "edge79"],
    format: "esm",
    platform: "browser",
    // built-in loaders: js, jsx, ts, tsx, css, json, text, base64, dataurl, file, binary
    loader: { ".js": "jsx" },
    sourcemap: !isProduction,
    // here we exclude package from bundle which are defined in peerDependencies
    // our importmap generator uses also the peerDependencies to create the importmap
    // it means all packages defined in peerDependencies are in browser available via the importmap
    external:
      isProduction && !IGNORE_EXTERNALS
        ? Object.keys(pkg.peerDependencies || {})
        : [],
    entryPoints: [pkg.source],
    outdir,
    // this step is important for performance reason.
    // the main file (index.js) contains minimal code needed to
    // load the app via dynamic import (splitting: true)
    splitting: true,
    // we suport only esm!
    format: "esm",
    plugins: [
      {
        name: "start/end",
        setup(build) {
          build.onStart(() => {
            console.log(clear)
            console.log(yellow, "Compiling...")
          })
          build.onEnd((result) => console.log(green, "Done!"))
        },
      },
      {
        name: "parse-styles",
        setup(build) {
          build.onLoad(
            { filter: /.\.(css|scss)$/, namespace: "file" },
            async (args) => {
              let content
              // handle scss, convert to css
              if (args.path.endsWith(".scss")) {
                const result = sass.renderSync({ file: args.path })
                content = result.css
              } else {
                // read file content
                content = await fs.readFile(args.path)
              }
              const plugins = [require("tailwindcss"), require("autoprefixer")]
              const { css } = await postcss(plugins).process(content, {
                from: undefined,
              })

              return { contents: css, loader: "text" }
            }
          )
        },
      },
    ],
  })

  if (watch || serve) {
    if (watch) await ctx.watch()
    if (serve) {
      // generate app props based on package.json and secretProps.json
      await fs.writeFile(
        `./${outdir}/appProps.js`,
        `export default ${JSON.stringify(appProps())}`
      )

      let { host, port } = await ctx.serve({
        host: "0.0.0.0",
        port: parseInt(process.env.PORT),
        servedir: "public",
      })
      console.log("serve on", `${host}:${port}`)
    }
  } else {
    await ctx.rebuild()
    await ctx.dispose()
  }
}

build()
