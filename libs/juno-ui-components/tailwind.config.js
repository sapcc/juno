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
    fontFamily: {
      'sans': ['"IBM Plex Sans"', 'ui-sans-serif', 'Arial', 'system-ui', 'sans-serif'],
      'condensed': ['"IBM Plex Sans Condensed"', 'ui-sans-serif', 'Arial', 'system-ui', 'sans-serif'],
      'serif': ['"IBM Plex Serif"', 'ui-serif', 'serif'],
      'mono': ['"IBM Plex Mono"', 'ui-monospace', 'monospace']
    },
    colors: {
      "juno-grey-blue": {
        1: withOpacity("--color-juno-grey-blue-84-raw"),
        2: withOpacity("--color-juno-grey-blue-85-raw"),
        3: withOpacity("--color-juno-grey-blue-86-raw"),
        4: withOpacity("--color-juno-grey-blue-88-raw"),
        5: withOpacity("--color-juno-grey-blue-89-raw"),
        6: withOpacity("--color-juno-grey-blue-91-raw"),
        7: withOpacity("--color-juno-grey-blue-92-raw"),
        8: withOpacity("--color-juno-grey-blue-93-raw"),
        9: withOpacity("--color-juno-grey-blue-95-raw"),
        10: withOpacity("--color-juno-grey-blue-100-raw"),
        DEFAULT: withOpacity("--color-juno-grey-blue-100-raw"),
      },
      "juno-blue": {
        1: withOpacity("--color-juno-blue-light-raw"),
        2: withOpacity("--color-juno-blue-light-1-raw"),
        3: withOpacity("--color-juno-blue-light-2-raw"),
        4: withOpacity("--color-juno-blue-light-3-raw"),
        5: withOpacity("--color-juno-blue-raw"),
        6: withOpacity("--color-juno-blue-dark-1-raw"),
        7: withOpacity("--color-juno-blue-dark-raw"),
        8: withOpacity("--color-juno-blue-darker-2-raw"),
        9: withOpacity("--color-juno-blue-darker-1-raw"),
        10: withOpacity("--color-juno-blue-darker-raw"),
        DEFAULT: withOpacity("--color-juno-blue-raw"),
      },
      "sap-grey": {
        1: withOpacity("--color-sap-white-raw"),
        2: withOpacity("--color-sap-grey-5-raw"),
        3: withOpacity("--color-sap-grey-4-raw"),
        4: withOpacity("--color-sap-grey-3-raw"),
        5: withOpacity("--color-sap-grey-2-raw"),
        6: withOpacity("--color-sap-grey-1-raw"),
        7: withOpacity("--color-sap-grey-0-raw"),
        8: withOpacity("--color-sap-black-raw"),
        DEFAULT: withOpacity("--color-sap-black-raw"),
      },
      "sap-blue": {
        1: withOpacity("--sap-blue-light-raw"),
        2: withOpacity("--sap-blue-light-1-raw"),
        3: withOpacity("--sap-blue-light-2-raw"),
        4: withOpacity("--sap-blue-light-3-raw"),
        5: withOpacity("--sap-blue-raw"),
        6: withOpacity("--sap-blue-dark-1-raw"),
        7: withOpacity("--sap-blue-dark-raw"),
        8: withOpacity("--color-sap-blue-darker-2-raw"),
        9: withOpacity("--color-sap-blue-darker-1-raw"),
        10: withOpacity("--color-sap-blue-darker-raw"),
        DEFAULT: withOpacity("--sap-blue-raw"),
      },
      "sap-gold": {
        1: withOpacity("--color-sap-gold-light-raw"),
        2: withOpacity("--color-sap-gold-light-1-raw"),
        3: withOpacity("--color-sap-gold-light-2-raw"),
        4: withOpacity("--color-sap-gold-light-3-raw"),
        5: withOpacity("--color-sap-gold-raw"),
        6: withOpacity("--color-sap-gold-dark-raw"),
        7: withOpacity("--color-sap-gold-dark-1-raw"),
        DEFAULT: withOpacity("--color-sap-gold-raw"),
      },
      "sap-purple": {
        1: withOpacity("--color-sap-purple-light-raw"),
        2: withOpacity("--color-sap-purple-light-1-raw"),
        3: withOpacity("--color-sap-purple-light-2-raw"),
        4: withOpacity("--color-sap-purple-light-3-raw"),
        5: withOpacity("--color-sap-purple-raw"),
        6: withOpacity("--color-sap-purple-dark-raw"),
        7: withOpacity("--color-sap-purple-dark-1-raw"),
        DEFAULT: withOpacity("--color-sap-purple-raw"),
      },
      "sap-green": {
        1: withOpacity("--color-sap-green-light-raw"),
        2: withOpacity("--color-sap-green-light-1-raw"),
        3: withOpacity("--color-sap-green-light-2-raw"),
        4: withOpacity("--color-sap-green-light-3-raw"),
        5: withOpacity("--color-sap-green-raw"),
        6: withOpacity("--color-sap-green-dark-raw"),
        7: withOpacity("--color-sap-green-dark-1-raw"),
        DEFAULT: withOpacity("--color-sap-green-raw"),
      },
      "sap-red": {
        1: withOpacity("--color-sap-red-light-raw"),
        2: withOpacity("--color-sap-red-light-1-raw"),
        3: withOpacity("--color-sap-red-light-2-raw"),
        4: withOpacity("--color-sap-red-light-3-raw"),
        5: withOpacity("--color-sap-red-raw"),
        6: withOpacity("--color-sap-red-dark-raw"),
        7: withOpacity("--color-sap-red-dark-1-raw"),
      },
      white: withOpacity("--color-white-raw"),
      black: withOpacity("--color-black-raw"),
      transparent: "transparent",
      danger: withOpacity("--color-danger-raw"),
      info: withOpacity("--color-info-raw"),
      success: withOpacity("--color-success-raw"),
      warning: withOpacity("--color-warning-raw"), 
      focus: withOpacity("--color-focus-raw"),
    },
    borderColor: theme => ({
      ...theme('colors'),
      theme: {
        default: withOpacity("--color-default-border"),
        "button-default": withOpacity("--color-button-default-border"),
        "button-subdued": withOpacity("--color-button-subdued-border"),
        "message-default": withOpacity("--color-message-default-border"),
        "message-danger": withOpacity("--color-message-danger-border"),
        "message-warning": withOpacity("--color-message-warning-border"),
        "message-success": withOpacity("--color-message-success-border"),
        "introbox": withOpacity("--color-introbox-border"),
      },
    }),
    extend: {
      backgroundColor: {
        theme: {
          "global-bg": withOpacity("--color-global-bg"),
          "button-primary": withOpacity("--color-button-primary-bg"),
          "button-danger": withOpacity("--color-button-danger-bg"),
          "button-default": withOpacity("--color-button--default-bg"),
          // TODO:
          //"primary-hover": withOpacity("--color-primary-bg-hover"),
          //"danger-hover": withOpacity("--color-danger-bg-hover"),
          //"default-hover": withOpacity("--color-default-bg-hover"),
          // TODO: active button bg colors
          "message": withOpacity("--color-message-bg"),
          "tooltip-popover": withOpacity("--color-tooltip-popover-bg"),
          "textinput": withOpacity("--color-textinput-bg"),
          "select": withOpacity("--color-select-bg"),
          "required": withOpacity("--color-required-bg"),
        },
      },
      textColor: {
        theme: {
          default: withOpacity("--color-global-text"),
          "high": withOpacity("--color-text-high"),
          "medium": withOpacity("--color-text-medium"),
          "disabled": withOpacity("--color-text-disabled"),
          "on-primary": withOpacity("--color-button-primary-text"),
          "on-danger": withOpacity("--color-button-danger-text"),
          "on-default": withOpacity("--color-button-default-text"),
          "tooltip-popover": withOpacity("--color-tooltip-popover-text"),
          "textinput": withOpacity("--color-textinput-text"),
        },
      },
      padding: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
      },
      height: {
        "textinput": "2.75rem",
        "floatinglabelinput": "3rem",
      },
      borderRadius: {
        "3px": "3px",
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
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      cursor: ['disabled']
    }
  },
  plugins: [],
}
