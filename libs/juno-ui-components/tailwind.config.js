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
  purge: ["./src/components/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      "sap-blue": {
        0: withOpacity("--color-rgb-sap-blue-0"),
        10: withOpacity("--color-rgb-sap-blue-10"),
        20: withOpacity("--color-rgb-sap-blue-20"),
        30: withOpacity("--color-rgb-sap-blue-30"),
        40: withOpacity("--color-rgb-sap-blue-40"),
        50: withOpacity("--color-rgb-sap-blue-50"),
        60: withOpacity("--color-rgb-sap-blue-60"),
        70: withOpacity("--color-rgb-sap-blue-70"),
        80: withOpacity("--color-rgb-sap-blue-80"),
        90: withOpacity("--color-rgb-sap-blue-90"),
        100: withOpacity("--color-rgb-sap-blue-100"),
        DEFAULT: withOpacity("--color-rgb-sap-blue"),
      },
      "sap-gold": {
        0: withOpacity("--color-rgb-sap-gold-0"),
        10: withOpacity("--color-rgb-sap-gold-10"),
        20: withOpacity("--color-rgb-sap-gold-20"),
        30: withOpacity("--color-rgb-sap-gold-30"),
        40: withOpacity("--color-rgb-sap-gold-40"),
        50: withOpacity("--color-rgb-sap-gold-50"),
        60: withOpacity("--color-rgb-sap-gold-60"),
        70: withOpacity("--color-rgb-sap-gold-70"),
        80: withOpacity("--color-rgb-sap-gold-80"),
        90: withOpacity("--color-rgb-sap-gold-90"),
        100: withOpacity("--color-rgb-sap-gold-100"),
        DEFAULT: withOpacity("--color-rgb-sap-gold"),
      },
      "blue-gray": {
        0: withOpacity("--color-rgb-blue-gray-0"),
        10: withOpacity("--color-rgb-blue-gray-10"),
        20: withOpacity("--color-rgb-blue-gray-20"),
        30: withOpacity("--color-rgb-blue-gray-30"),
        40: withOpacity("--color-rgb-blue-gray-40"),
        50: withOpacity("--color-rgb-blue-gray-50"),
        60: withOpacity("--color-rgb-blue-gray-60"),
        70: withOpacity("--color-rgb-blue-gray-70"),
        80: withOpacity("--color-rgb-blue-gray-80"),
        90: withOpacity("--color-rgb-blue-gray-90"),
        100: withOpacity("--color-rgb-blue-gray-100"),
        DEFAULT: withOpacity("--color-rgb-blue-gray"),
      },
      red: {
        0: withOpacity("--color-rgb-red-0"),
        10: withOpacity("--color-rgb-red-10"),
        20: withOpacity("--color-rgb-red-20"),
        30: withOpacity("--color-rgb-red-30"),
        40: withOpacity("--color-rgb-red-40"),
        50: withOpacity("--color-rgb-red-50"),
        60: withOpacity("--color-rgb-red-60"),
        70: withOpacity("--color-rgb-red-70"),
        80: withOpacity("--color-rgb-red-80"),
        90: withOpacity("--color-rgb-red-90"),
        100: withOpacity("--color-rgb-red-100"),
        DEFAULT: withOpacity("--color-rgb-red"),
      },
      yellow: {
        0: withOpacity("--color-rgb-yellow-0"),
        10: withOpacity("--color-rgb-yellow-10"),
        20: withOpacity("--color-rgb-yellow-20"),
        30: withOpacity("--color-rgb-yellow-30"),
        40: withOpacity("--color-rgb-yellow-40"),
        50: withOpacity("--color-rgb-yellow-50"),
        60: withOpacity("--color-rgb-yellow-60"),
        70: withOpacity("--color-rgb-yellow-70"),
        80: withOpacity("--color-rgb-yellow-80"),
        90: withOpacity("--color-rgb-yellow-90"),
        100: withOpacity("--color-rgb-yellow-100"),
        DEFAULT: withOpacity("--color-rgb-yellow"),
      },
      white: withOpacity("--color-rgb-white"),
      danger: withOpacity("--color-rgb-red"),
      warning: withOpacity("--color-rgb-yellow"),
    },
    extend: {
      backgroundColor: {
        theme: {
          primary: withOpacity("--color-primary-bg"),
          danger: withOpacity("--color-danger-bg"),
          default: withOpacity("--color-default-bg"),
          "primary-hover": withOpacity("--color-primary-bg-hover"),
          "danger-hover": withOpacity("--color-danger-bg-hover"),
          "default-hover": withOpacity("--color-default-bg-hover"),
        }
      },
      textColor: {
        theme: {
          "on-primary": withOpacity("--color-primary-foreground"),
          "on-danger": withOpacity("--color-danger-foreground"),
          "on-default": withOpacity("--color-default-foreground"),
        }
      },
      borderColor: {
        theme: {
          primary: withOpacity("--color-primary-border"),
          danger: withOpacity("--color-danger-border"),
          default: withOpacity("--color-default-border"),
        }
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
