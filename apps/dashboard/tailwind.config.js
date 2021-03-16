module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "sap-blue": "#008fd3",
        "sap-dark-blue": {
          900: "#16202B",
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
      "gradient-radial": "radial-gradient(ellipse closest-side, var(--tw-gradient-stops))"
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
