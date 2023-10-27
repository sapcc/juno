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
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/dummyComponents/*.{js,jsx,ts,tsx}",
  ],
  prefix: 'jn-',
  theme: {
    fontFamily: {
      sans: [
        '"IBM Plex Sans"',
        "ui-sans-serif",
        "Arial",
        "system-ui",
        "sans-serif",
      ],
      condensed: [
        '"IBM Plex Sans Condensed"',
        "ui-sans-serif",
        "Arial",
        "system-ui",
        "sans-serif",
      ],
      serif: ['"IBM Plex Serif"', "ui-serif", "serif"],
      mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
    },
    colors: {
      current: "currentColor", // this is required for fill-current and stroke-current to work when you have custom colors
      "juno-grey-blue": {
        1: withOpacity("--color-juno-grey-blue-1-raw"),
        2: withOpacity("--color-juno-grey-blue-2-raw"),
        3: withOpacity("--color-juno-grey-blue-3-raw"),
        4: withOpacity("--color-juno-grey-blue-4-raw"),
        5: withOpacity("--color-juno-grey-blue-5-raw"),
        6: withOpacity("--color-juno-grey-blue-6-raw"),
        7: withOpacity("--color-juno-grey-blue-7-raw"),
        8: withOpacity("--color-juno-grey-blue-8-raw"),
        9: withOpacity("--color-juno-grey-blue-9-raw"),
        10: withOpacity("--color-juno-grey-blue-10-raw"),
        11: withOpacity("--color-juno-grey-blue-11-raw"),
        DEFAULT: withOpacity("--color-juno-grey-blue-11-raw"),
      },
      "juno-blue": {
        1: withOpacity("--color-juno-blue-1-raw"),
        2: withOpacity("--color-juno-blue-2-raw"),
        3: withOpacity("--color-juno-blue-3-raw"),
        4: withOpacity("--color-juno-blue-4-raw"),
        5: withOpacity("--color-juno-blue-5-raw"),
        6: withOpacity("--color-juno-blue-6-raw"),
        7: withOpacity("--color-juno-blue-7-raw"),
        8: withOpacity("--color-juno-blue-8-raw"),
        9: withOpacity("--color-juno-blue-9-raw"),
        10: withOpacity("--color-juno-blue-10-raw"),
        DEFAULT: withOpacity("--color-juno-blue-5-raw"),
      },
      "juno-turquoise": {
        1: withOpacity("--color-juno-turquoise-1-raw"),
        2: withOpacity("--color-juno-turquoise-2-raw"),
        3: withOpacity("--color-juno-turquoise-3-raw"),
        4: withOpacity("--color-juno-turquoise-4-raw"),
        5: withOpacity("--color-juno-turquoise-5-raw"),
        6: withOpacity("--color-juno-turquoise-6-raw"),
        7: withOpacity("--color-juno-turquoise-7-raw"),
        8: withOpacity("--color-juno-turquoise-8-raw"),
        9: withOpacity("--color-juno-turquoise-9-raw"),
        10: withOpacity("--color-juno-turquoise-10-raw"),
        DEFAULT: withOpacity("--color-juno-turquoise-5-raw"),
      },
      "juno-grey-light": {
        1: withOpacity("--color-juno-grey-light-1-raw"),
        2: withOpacity("--color-juno-grey-light-2-raw"),
        3: withOpacity("--color-juno-grey-light-3-raw"),
        4: withOpacity("--color-juno-grey-light-4-raw"),
        5: withOpacity("--color-juno-grey-light-5-raw"),
        6: withOpacity("--color-juno-grey-light-6-raw"),
        7: withOpacity("--color-juno-grey-light-7-raw"),
        8: withOpacity("--color-juno-grey-light-8-raw"),
        9: withOpacity("--color-juno-grey-light-9-raw"),
        10: withOpacity("--color-juno-grey-light-10-raw"),
        11: withOpacity("--color-juno-grey-light-11-raw"),
        DEFAULT: withOpacity("--color-juno-grey-light-1-raw"),
      },
      "sap-grey": {
        1: withOpacity("--color-sap-grey-1-raw"),
        2: withOpacity("--color-sap-grey-2-raw"),
        3: withOpacity("--color-sap-grey-3-raw"),
        4: withOpacity("--color-sap-grey-4-raw"),
        5: withOpacity("--color-sap-grey-5-raw"),
        6: withOpacity("--color-sap-grey-6-raw"),
        7: withOpacity("--color-sap-grey-7-raw"),
        8: withOpacity("--color-sap-grey-8-raw"),
        DEFAULT: withOpacity("--color-sap-grey-8-raw"),
      },
      "sap-blue": {
        1: withOpacity("--color-sap-blue-1-raw"),
        2: withOpacity("--color-sap-blue-2-raw"),
        3: withOpacity("--color-sap-blue-3-raw"),
        4: withOpacity("--color-sap-blue-4-raw"),
        5: withOpacity("--color-sap-blue-5-raw"),
        6: withOpacity("--color-sap-blue-6-raw"),
        7: withOpacity("--color-sap-blue-7-raw"),
        DEFAULT: withOpacity("--color-sap-blue-5-raw"),
      },
      "sap-gold": {
        DEFAULT: withOpacity("--color-sap-gold-raw"),
      },
      "sap-purple": {
        1: withOpacity("--color-sap-purple-1-raw"),
        2: withOpacity("--color-sap-purple-2-raw"),
        3: withOpacity("--color-sap-purple-3-raw"),
        4: withOpacity("--color-sap-purple-4-raw"),
        5: withOpacity("--color-sap-purple-5-raw"),
        6: withOpacity("--color-sap-purple-6-raw"),
        7: withOpacity("--color-sap-purple-7-raw"),
        DEFAULT: withOpacity("--color-sap-purple-5-raw"),
      },
      "sap-green": {
        1: withOpacity("--color-sap-green-1-raw"),
        2: withOpacity("--color-sap-green-2-raw"),
        3: withOpacity("--color-sap-green-3-raw"),
        4: withOpacity("--color-sap-green-4-raw"),
        5: withOpacity("--color-sap-green-5-raw"),
        6: withOpacity("--color-sap-green-6-raw"),
        7: withOpacity("--color-sap-green-7-raw"),
        DEFAULT: withOpacity("--color-sap-green-5-raw"),
      },
      "sap-red": {
        1: withOpacity("--color-sap-red-1-raw"),
        2: withOpacity("--color-sap-red-2-raw"),
        3: withOpacity("--color-sap-red-3-raw"),
        4: withOpacity("--color-sap-red-4-raw"),
        5: withOpacity("--color-sap-red-5-raw"),
        6: withOpacity("--color-sap-red-6-raw"),
        7: withOpacity("--color-sap-red-7-raw"),
        8: withOpacity("--color-sap-red-8-raw"),
        DEFAULT: withOpacity("--color-sap-red-5-raw"),
      },
      white: withOpacity("--color-white-raw"),
      black: withOpacity("--color-black-raw"),
      transparent: "transparent",
      theme: {
        accent: withOpacity("--color-accent-raw"),
        danger: withOpacity("--color-danger-raw"),
        error: withOpacity("--color-error-raw"),
        info: withOpacity("--color-info-raw"),
        success: withOpacity("--color-success-raw"),
        warning: withOpacity("--color-warning-raw"),
        focus: withOpacity("--color-focus-raw"),
        "background-lvl-0": withOpacity("--color-background-lvl-0-raw"),
        "background-lvl-1": withOpacity("--color-background-lvl-1-raw"),
        "background-lvl-2": withOpacity("--color-background-lvl-2-raw"),
        "background-lvl-3": withOpacity("--color-background-lvl-3-raw"),
        "background-lvl-4": withOpacity("--color-background-lvl-4-raw"),
        "background-lvl-5": withOpacity("--color-background-lvl-5-raw"),
      },
    },
    extend: {
      backgroundColor: {
        theme: {
          "global-bg": withOpacity("--color-global-bg-raw"),
          "badge-default": "var(--color-badge-default-bg)",
          "box-default": "var(--color-box-bg)",
          "code-block": withOpacity("--color-codeblock-bg"),
          "content-area-bg": withOpacity("--color-content-area-bg-raw"),
          panel: "var(--color-panel-bg)",
          textinput: withOpacity("--color-textinput-bg"),
          select: withOpacity("--color-select-bg"),
          checkbox: withOpacity("--color-checkbox-bg"),
          radio: withOpacity("--color-radio-bg"),
          "radio-checked": withOpacity("--color-radio-checked-bg"),
          "switch-handle": withOpacity("--color-switch-handle-bg"),
          "switch-handle-checked": withOpacity(
            "--color-switch-handle-checked-bg"
          ),
          required: withOpacity("--color-required-bg"),
          introbox: withOpacity("--color-introbox-bg"),
          "datagridrow-selected": withOpacity("--color-datagridrow-selected"),
          "datalistrow-selected": withOpacity("--color-datalistrow-selected"),
          "message-border-danger": withOpacity("--color-message-danger-border"),
          "message-border-default": withOpacity(
            "--color-message-default-border"
          ),
          "message-border-error": withOpacity("--color-message-error-border"),
          "message-border-warning": withOpacity(
            "--color-message-warning-border"
          ),
          "message-border-success": withOpacity(
            "--color-message-success-border"
          ),
          "tab-navigation-top": withOpacity("--color-tabnavigation-top-bg"),
          filters: withOpacity("--color-filters-bg"),
          "filter-input": withOpacity("--color-filter-input-bg"),
          "filter-input-textinput": withOpacity("--color-filter-input-textinput-bg"),
          "filter-pill-key": withOpacity("--color-filter-pill-key-bg"),
          "modal-backdrop": "var(--color-modal-backdrop-bg)",
        },
      },
      backgroundImage: {
        "theme-message-default": "var(--gradient-message-default-bg)",
        "theme-message-success": "var(--gradient-message-success-bg)",
        "theme-message-warning": "var(--gradient-message-warning-bg)",
        "theme-message-danger": "var(--gradient-message-danger-bg)",
        "theme-message-error": "var(--gradient-message-error-bg)",
      },
      textColor: {
        theme: {
          highest: withOpacity("--color-text-highest-raw"),
          high: withOpacity("--color-text-high-raw"),
          default: withOpacity("--color-text-default-raw"),
          light: withOpacity("--color-text-light-raw"),
          disabled: withOpacity("--color-text-disabled-raw"),
          link: withOpacity("--color-text-link-raw"),
          "on-danger": withOpacity("--color-button-danger-text"),
          "on-default": withOpacity("--color-button-default-text"),
          textinput: withOpacity("--color-textinput-text"),
          "checkbox-checked": withOpacity("--color-checkbox-checked-color"),
        },
      },
      borderColor: {
        theme: {
          default: withOpacity("--color-default-border"),
          "codeblock-bar": withOpacity(
            "--color-codeblock-bar-border"
          ),
          "codeblock-tab-active": withOpacity("--color-text-default-raw"),
          "message-default": withOpacity("--color-message-default-border"),
          "message-danger": withOpacity("--color-message-danger-border"),
          "message-error": withOpacity("--color-message-error-border"),
          "message-warning": withOpacity("--color-message-warning-border"),
          "message-success": withOpacity("--color-message-success-border"),
          panel: withOpacity("--color-panel-border-raw"),
          "switch-default": withOpacity("--color-switch-default-border"),
          "switch-hover": withOpacity("--color-switch-hover-border"),
          "datalist-row": withOpacity("--color-datalist-row-border"),
          introbox: withOpacity("--color-introbox-border"),
          "tab-navigation-content-bottom": withOpacity("--color-tabnavigation-content-bottom-border"),
          "tab-active-bottom": withOpacity("--color-text-default-raw"),
          "filter-input": withOpacity("--color-filter-input-border"),
          "filter-pill": withOpacity("--color-filter-pill-border"),
          "box-default": "var(--color-box-border)",
          "textinput-default": withOpacity("--color-textinput-default-border")
        },
      },
      // backgroundImage: theme => ({
      //   'icon-arrow-down': "url('./img/icon_arrow_down.svg')",
      // }),
      padding: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        "grid-column": "0 .5rem",
      },
      height: {
        textinput: "2.375rem",
        floatinglabelinput: "3rem",
        "switch-default": "1.4375rem",
        "switch-handle-default": "1.1875rem",
      },
      ringOffsetColor: {
        theme: {
          focus: withOpacity("--color-global-bg-raw"),
        },
      },
      width: {
        "switch-default": "2.625rem",
        "switch-handle-default": "1.1875rem",
        "grid-column-default": "var(--grid-column-default-width)",
        "grid-col-1": "8.333333%",
        "grid-col-2": "16.666667%",
        "grid-col-3": "25%",
        "grid-col-4": "33.333333%",
        "grid-col-5": "41.666667%",
        "grid-col-6": "50%",
        "grid-col-7": "58.333333%",
        "grid-col-8": "66.666667%",
        "grid-col-9": "75%",
        "grid-col-10": "83.333333%",
        "grid-col-11": "91.666667%",
        "grid-col-12": "100%",
      },
      borderRadius: {
        "3px": "3px",
      },
      margin: {
        "grid-row": "0 var(--grid-row-margin-x)",
      },
      flex: {
        "grid-column":
          "var(--grid-column-flex-grow) var(--grid-column-flex-shrink) var(--grid-column-flex-basis)",
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
  plugins: [],
}
