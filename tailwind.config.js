const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'sap-blue': colors.lightBlue
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
