module.exports = {
  purge: ["./src/components/**/*.{js,jsx,ts,tsx}"],
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
          600: "#344559",
        },
        "sap-gold": "#f0ab00",

        primary: "var(--color-primary)",
        primaryBg: "var(--color-primaryBg)",

        neutralBg: "var(--color-neutralBg)",
        neutral: "var(--color-neutral)",

        button: {
          primaryBg: "var(--color-button-primary-bg)",
          primaryBgHover: "var(--color-button-primary-bg-hover)",
          primaryForeground: "var(--color-button-primary-foreground)",

          defaultBg: "var(--color-button-default-bg)",
          defaultBgHover: "var(--color-button-default-bg-hover)",
          defaultForeground: "var(--color-button-default-foreground)",
        },
      },
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
