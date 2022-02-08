// opacity helper to make custom colors work with opacity
function withOpacity(variableName) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${variableName}), var(${opacityVariable}, 1))`
    }
    return `rgb(var(${variableName}))`
  }
}

module.exports = {
  presets: [
    require('juno-ui-components/tailwind.config')
  ],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {},
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
