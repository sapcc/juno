const esbuild = require("esbuild")
const pkg = require("./package.json")

if (!/.+\/.+\.js/.test(pkg.module))
  throw new Error(
    "module value is incorrect, use DIR/FILE.js like build/index.js"
  )

const isProduction = process.env.NODE_ENV === "production"
const IGNORE_EXTERNALS = process.env.IGNORE_EXTERNALS === "true"
const outfile = isProduction ? pkg.module : "dev/build.js"
const args = process.argv.slice(2)
const watch = args.indexOf("--watch") >= 0

esbuild
  .context({
    entryPoints: [pkg.source],
    outfile,
    bundle: true,
    minify: isProduction,
    target: ["es2020"],
    format: "esm",
    external:
      isProduction && !IGNORE_EXTERNALS
        ? Object.keys(pkg.peerDependencies || {})
        : [],
  })
  .then((ctx) => {
    if (watch) {
      ctx.watch()
      console.log("watching...")
      ctx
        .serve({
          host: "0.0.0.0",
          port: parseInt(process.env.APP_PORT),
          servedir: "dev",
        })
        .then(({ host, port }) => console.log("serve on", `${host}:${port}`))
    }
  })
