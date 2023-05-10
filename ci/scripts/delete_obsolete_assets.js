const fs = require("fs")
const path = require("path")

const args = process.argv.slice(2)

const options = {
  manifest: null,
  src: "./",
}

args.forEach((arg) => {
  let [key, value] = arg.split("=")
  // convert dash-case to camelCase
  key = key.replace(/^-+/g, "").replace(/-([^-])/g, (_, a) => a.toUpperCase())
  options[key] = value
})

console.log("options:", options)
console.log("delete obsolete assets in " + options.src)
if (!options.manifest) {
  console.error("Please provide a source URL")
  process.exit(1)
}

async function deleteAssets(src, assetNames) {
  fs.readdirSync(src).forEach(async (file) => {
    // console.log("::::", src, file)
    const newPath = path.join(src, file)

    const allVersionsPattern = file.replace(/@.*$/, "") + "@*"
    // console.log("===", allVersionsPattern)
    if (assetNames.includes(file) || assetNames.includes(allVersionsPattern)) {
      console.log("delete", file)
      await fs.rmSync(newPath, { recursive: true })
    } else if (fs.statSync(newPath).isDirectory()) {
      deleteAssets(newPath, assetNames)
    }
  })
}

async function main() {
  const obsoleteAssets = JSON.parse(
    await fs.readFileSync(options.manifest, "utf-8")
  )

  const assetNames = []
  for (let name in obsoleteAssets) {
    obsoleteAssets[name].forEach((version) => {
      assetNames.push(`${name}@${version}`)
    })
  }

  console.log("Assets to be deleted:", assetNames)
  await deleteAssets(options.src, assetNames)
}

main()
