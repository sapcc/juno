module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "sap-blue": "#008fd3",
        "sap-dark-blue": {
          900: "#16202B",
          850: "#202F42",
          800: "#223346",
          700: "#273241",
          DEFAULT: "#273241",
          600: "#344559"
        },
        "sap-gold": "#f0ab00",
      },
    },
    backgroundImage: (theme) => ({
      "hero-background": "url('/img/Hero_image.png')",
      "white-dotted": "url('/img/map_bg_pattern.png')",
      "gradient-radial": "radial-gradient(ellipse closest-side, var(--tw-gradient-stops))"
    }),
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
