
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "sap-blue": "#008fd3",
        "sap-dark-blue": {
          dark: "#16202B",
          DEFAULT: "#273241",
          light: "#344559"
        },
        "sap-gold": "#f0ab00"
      },
    },
    backgroundImage: (theme) => ({
      "hero-background": "url('/img/Hero_image.png')",
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
