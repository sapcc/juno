const fs = require("fs")
const path = require("path")
const glob = require("glob")

const rootPath = path.resolve(__dirname, "../../")

const PACKAGES_PATHS = ["apps", "libs"]
const globPattern = `${rootPath}/@(${PACKAGES_PATHS.join("|")})/**/package.json`
const pathRegex = new RegExp(`^${rootPath}/(.+)/package.json$`)
const files = glob.sync(globPattern, { ignore: [`**/node_modules/**`] })

// delete test data
fs.rmSync(path.resolve(__dirname, "test_data"), {
  recursive: true,
  force: true,
})
fs.mkdirSync(path.resolve(__dirname, "test_data"))

for (let file of files) {
  const assetPath = file.match(pathRegex)[1]
  const testDir = path.resolve(__dirname, "test_data", assetPath)
  const pkg = JSON.parse(fs.readFileSync(file))

  fs.mkdirSync(`${testDir}@${pkg.version}`, { recursive: true })
  fs.mkdirSync(`${testDir}@latest`, { recursive: true })
  fs.copyFileSync(file, `${testDir}@${pkg.version}/package.json`)
  fs.copyFileSync(file, `${testDir}@latest/package.json`)
}

console.log("DONE!")
