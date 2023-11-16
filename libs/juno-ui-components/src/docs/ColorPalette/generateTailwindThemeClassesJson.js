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

  fs.writeFileSync(
    "./src/docs/ColorPalette/TailwindJunoColors.js",
    "module.exports=" + JSON.stringify(getJunoColors(), null, 2)
  )
}

const getColors = () => {
  const allowList = [
    "accent",
    "danger",
    "error",
    "info",
    "success",
    "warning",
    "focus",
    "background-lvl-0",
    "background-lvl-1",
    "background-lvl-2",
    "background-lvl-3",
    "background-lvl-4",
    "background-lvl-5",
  ]
  const theme = tailwindConfig.theme.colors.theme
  const colors = {}
  Object.keys(theme).forEach((colorName) => {
    if (allowList.includes(colorName)) {
      colors[colorName] = `jn-bg-theme-${colorName}`
    }
  })

  return colors
}

const getTextColors = () => {
  const allowList = ["highest", "high", "default", "light", "disabled", "link"]
  const theme = tailwindConfig.theme.extend.textColor.theme
  const colors = {}
  Object.keys(theme).forEach((colorName) => {
    if (allowList.includes(colorName)) {
      colors[colorName] = `jn-text-theme-${colorName}`
    }
  })

  return colors
}

const getJunoColors = () => {
  const allowList = [
    "juno-grey-blue",
    "juno-blue",
    "juno-turquoise",
    "juno-grey-light",
    "sap-grey",
    "sap-blue",
    "sap-gold",
    "sap-purple",
    "sap-green",
    "sap-red",
    "white",
    "black",
  ]
  const colorList = tailwindConfig.theme.colors

  let colors = {}

  Object.keys(colorList).forEach((colorName) => {
    if (allowList.includes(colorName)) {
      colors[colorName] = `jn-bg-${colorName}`

      const colorfam = Object.keys(colorList[colorName])

      if (colorfam) {
        colorfam.map((subcolor) => {
          if (subcolor != "DEFAULT") {
            colors[
              `${colorName}-${subcolor}`
            ] = `jn-bg-${colorName}-${subcolor}`
          }
        })
      }
    }
  })

  return colors
}

module.exports = { generateTailwindThemeClassesJson }
