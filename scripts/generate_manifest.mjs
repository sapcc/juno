import { execSync } from "node:child_process"
const root = execSync("npm root -g").toString().trim()

const glob = await import(`${root}/glob/glob.js`).then((m) => m.default)
import * as fs from "fs"
import path from "path"
import url from "url"
import { readdir } from "fs/promises"

const availableArgs = [
  "--src=DIR_PATH",
  "--output=FILE_PATH",
  "--verbose|-v",
  "--help|-h",
]

const options = {
  src: path.dirname(url.fileURLToPath(import.meta.url)),
  output: "./manifest.json",
  verbose: false,
  v: false,
}

const args = process.argv.slice(2)

// PARSE ARGS
for (let arg of args) {
  const match = arg.match(/^-{1,2}([^=]+)=?(.*)/)
  if (match) {
    let key = match[1].replace(/\W+(.)/g, function (match, chr) {
      console.log(match, chr)
      return chr.toUpperCase()
    })

    options[key] = match[2] ? match[2] : true
    continue
  }
}
if (options.help || options.h) {
  console.log("Usage: " + availableArgs.join(" "))
}

const PACKAGES_PATHS = ["apps", "libs"]
const rootPath = path.resolve(options.src)
const globPattern = `${rootPath}/@(${PACKAGES_PATHS.join("|")})/**/package.json`
const pathRegex = new RegExp(`^${rootPath}/(.+)/package.json$`)
const files = glob.sync(globPattern, { ignore: [`node_modules/**`] })

const manifest = {}

// console.log(files)
files.sort().forEach(async (file) => {
  const pkg = JSON.parse(fs.readFileSync(file))
  const path = file.match(pathRegex)[1]
  const entryFile = pkg.module || pkg.main
  const entryDir = entryFile.slice(0, entryFile.lastIndexOf("/"))
  const meta = fs.statSync(path)

  manifest[pkg.name] = manifest[pkg.name] || {}
  manifest[pkg.name][pkg.version] = {
    path,
    entryFile: path + "/" + entryFile,
    entryDir: path + "/" + entryDir,
    createdAt: meta.birthtime,
    updatedAt: meta.mtime,
    size: meta.size,
  }

  if (path.indexOf("@latest") > 0)
    manifest[pkg.name]["latest"] = manifest[pkg.name][pkg.version]
  // console.log(path + "/" + entryDir, meta)
})

if (options.verbose || options.v) {
  console.log("==============MANIFEST==============")
  console.log(JSON.stringify(manifest, null, 2))
}
fs.writeFileSync(options.output, JSON.stringify(manifest, null, 2))
