const fs = require("fs")
const tailwindConfig = require("../../../tailwind.config")

/* 
  Generates Tailwindclasses in a js file. So Tailwind generates the classes and so they are useable in the documentation, which colors are available. 
*/

const generateTailwindThemeClassesJson = () => {
  fs.writeFileSync(
    "./src/docs/ColorPalette/TailwindThemeColors.js",
    "module.exports=" + JSON.stringify(getColors(), null, 2)
  )
  fs.writeFileSync(
    "./src/docs/ColorPalette/TailwindThemeTextColors.js",
    "module.exports=" + JSON.stringify(getTextColors(), null, 2)
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

const getTextColors = () => {
  const theme = tailwindConfig.theme.extend.textColor.theme
  const colors = {}
  Object.keys(theme).forEach((colorName) => {
    colors[colorName] = `jn-text-theme-${colorName}`
  })

  return colors
}

module.exports = { generateTailwindThemeClassesJson }
