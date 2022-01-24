const regex = {
  styles: /"?%STYLES%"?/g,
  theme: /"?%THEME%"?/g,
}

/**
 * This is a rollup plugin which parses the style provider.
 * @param {Object} options
 * @returns {Object} plugin data
 */
export default function myExample({ stylesFileName, theme }) {
  return {
    name: "styles-parser", // this name will show up in warnings and errors
    generateBundle: (_options, bundle) => {
      // find bundle which contains css
      const stylesKey = Object.keys(bundle).find((key) =>
        key.startsWith(stylesFileName)
      )
      // get css string
      let styles = stylesKey && bundle[stylesKey].source.toString().replace(/`/g, "'")

      // find all bundles which match placeholders %STYLES% and %THEME%
      for (let bundleName in bundle) {
        if (!bundle[bundleName].code) continue

        if (styles)
          bundle[bundleName].code = bundle[bundleName].code.replace(
            regex.styles,
            `String.raw\`${styles}\``
          )
        if (theme)
          bundle[bundleName].code = bundle[bundleName].code.replace(
            regex.theme,
            JSON.stringify(theme)
          )
      }
    },
  }
}
