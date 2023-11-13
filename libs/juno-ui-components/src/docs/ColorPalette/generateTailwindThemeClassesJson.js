const fs = require("fs")
const tailwindConfig = require("../../../tailwind.config")

// Beschreiben

const generateTailwindThemeClassesJson = () => {
  fs.writeFileSync(
    "./src/docs/ColorPalette/TailwindThemeColors.js",
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

module.exports = { generateTailwindThemeClassesJson }
