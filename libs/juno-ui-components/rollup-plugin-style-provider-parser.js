/**
 * This is a rollup plugin which parses the style provider.
 * @param {Object} options
 * @returns {Object} plugin data
 */
export default function myExample({ fileName, stylesFileName, theme }) {
  // default name of style provider file
  fileName = fileName || "StyleProvider"
  return {
    name: "style-provider-parser", // this name will show up in warnings and errors
    generateBundle: (_options, bundle) => {
      let providerKey, stylesKey

      // find keys for style profider and styles bundles
      for (let bundleName in bundle) {
        if (bundleName.startsWith(fileName)) providerKey = bundleName
        if (bundleName.startsWith(stylesFileName)) stylesKey = bundleName
      }

      if (providerKey) {
        if (stylesKey) {
          // normalize styles
          const styles = bundle[stylesKey].source.replace(/`/g, "'")

          // replace %STYLES% placeholder in style provider with styles
          bundle[providerKey].code = bundle[providerKey].code.replace(
            /"?%STYLES%"?/,
            `String.raw\`${styles}\``
          )
        }
        if (theme) {
          // replace %THEME% placeholder with theme if provided
          bundle[providerKey].code = bundle[providerKey].code.replace(
            /"?%THEME%"?/,
            JSON.stringify(theme)
          )
        }
      }
    },
  }
}
