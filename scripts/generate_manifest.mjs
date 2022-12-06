import * as fs from "fs"
import glob from "glob"
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

const PACKAGES_PATHS = {
  apps: path.resolve(options.src, "./apps"),
}

// // https://www.tabnine.com/code/javascript/modules/glob
// const libs = glob.sync(`${path.resolve(options.src, "./libs")}/*`, {
//   ignore: ["./node_modules/**", "./**/node_modules/**"],
// })

const getFiles = async (source, options = {}) =>
  (await readdir(source, { withFileTypes: true }))
    .filter((dirent) =>
      options.onlyDirs ? dirent.isDirectory() : dirent.isFile()
    )
    .map((dirent) => dirent.name)

const manifest = {}
// LIBS
const libs = await getFiles(`${path.resolve(options.src, "./libs")}`, {
  onlyDirs: true,
})

// APPS
const apps = await getFiles(`${path.resolve(options.src, "./apps")}`, {
  onlyDirs: true,
})

// const assets = glob
//   .sync(`${path.resolve(options.src, "./assets")}/**/*`)
//   .map((file) => file.match(/^.*assets\/(.*)/)[1])

if (libs && libs.length > 0) manifest["libs"] = libs.sort()
if (apps && apps.length > 0) manifest["apps"] = apps.sort()
// if (assets) manifest["assets"] = assets

if (options.verbose || options.v) {
  console.log("==============MANIFEST==============")
  console.log(JSON.stringify(manifest, null, 2))
}
fs.writeFileSync(options.output, JSON.stringify(manifest, null, 2))
