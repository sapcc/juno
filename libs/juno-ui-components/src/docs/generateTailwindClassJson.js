const fs = require("fs")
const tailwindConfig = require("../../tailwind.config")

// Beschreiben

const generateTailwindClassJson = () => {
  fs.writeFileSync(
    "./src/docs/colors.js",
    "module.exports=" + JSON.stringify(getColors(), null, 2)
  )
}

const getColors = () => {
  const theme = tailwindConfig.theme.colors.theme
  const colors = {}
  Object.keys(theme).forEach((colorName) => {
    colors[colorName] = `jn-bg-theme-${colorName}`
  })
  return colors
}

module.exports = { generateTailwindClassJson }
