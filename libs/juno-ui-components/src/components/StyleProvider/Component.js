/**
 * This module implements the style provider component.
 * It accepts the property 'stylesWrapper' which decides where
 * to place the ui-components styles.
 * @module StyleProvider
 */
import React from "react"
import PropTypes from "prop-types"
import { ShadowRoot } from "../ShadowRoot"

// theme and styles will be replaced with real values during the build process
const theme = "%THEME%"
const styles = "%STYLES%"

// create the context for values to be provided to the nested components.
const StylesContext = React.createContext()

// export a helper hook to use styles in nested components
export const useStyles = () => React.useContext(StylesContext)

/**
 * Functional component wich inserts the ui styles. It also creates a
 * shadow dom element with styes inside it if 'stylesWrapper' is equal
 * to "shadowRoot".
 * Accepted values for 'stylesWrapper' are 'head', 'inline' and 'shadowRoot'.
 * @param {object} props
 * @returns
 */
export const StyleProvider = ({
  stylesWrapper,
  theme: themeClassName,
  children,
  shadowRootMode,
}) => {
  // theme class default to theme-dark
  const themeClass = themeClassName || "theme-dark"
  // manage custom css classes (useStyles)
  const [customCssClasses, setCustomCssClasses] = React.useState("")

  React.useEffect(() => {
    // Add font links to head (Plex font from google CDN)
    const link1 = document.createElement("link")
    link1.rel = "preconnect"
    link1.href = "https://fonts.googleapis.com"

    const link2 = document.createElement("link")
    link2.rel = "preconnect"
    link2.href = "https://fonts.gstatic.com"
    link2.crossOrigin = "anonymous"

    const link3 = document.createElement("link")
    link3.rel = "stylesheet"
    link3.href =
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital@0;1&family=IBM+Plex+Sans+Condensed:ital@0;1&family=IBM+Plex+Sans:ital,wght@0,100;0,400;0,700;1,100;1,400;1,700&family=IBM+Plex+Serif:ital@0;1&display=swap"

    document.head.appendChild(link1)
    document.head.appendChild(link2)
    document.head.appendChild(link3)

    // undefined or inline are handled by renderer
    if (
      !stylesWrapper ||
      stylesWrapper === "inline" ||
      stylesWrapper === "shadowRoot"
    )
      return

    // return if already added
    if (document.querySelector(`[data-style-provider="${stylesWrapper}"]`))
      return

    // did not return yet -> stylesWrapper is head
    let wrapper = document.head

    // create and add style element to head
    const style = document.createElement("style")
    style.setAttribute("data-style-provider", stylesWrapper)
    if (style.styleSheet) {
      // This is required for IE8 and below.
      style.styleSheet.cssText = styles
    } else {
      style.appendChild(document.createTextNode(styles))
    }
    wrapper.prepend(style)
  }, [])

  return (
    <StylesContext.Provider value={{ styles, theme, setCustomCssClasses }}>
      {/* handle shadowRoot -> create shadow element and insert 
          styles and children into it */}
      {stylesWrapper === "shadowRoot" ? (
        <ShadowRoot
          mode={shadowRootMode}
          styles={styles}
          themeClass={themeClass}
          customCssClasses={customCssClasses}
        >
          {children}
        </ShadowRoot>
      ) : (
        <div className={`${themeClass} ${customCssClasses || ""}`}>
          {stylesWrapper === "inline" && (
            <style data-style-provider="inline">{styles}</style>
          )}
          {children}
        </div>
      )}
    </StylesContext.Provider>
  )
}

StyleProvider.propTypes = {
  stylesWrapper: PropTypes.oneOfType([
    PropTypes.oneOf(["head", "inline", "shadowRoot"]),
  ]),
  theme: PropTypes.string,
  shadowRootMode: PropTypes.oneOf(["open", "closed"]),
}

// define default values
StyleProvider.defaultProps = {
  stylesWrapper: undefined,
  theme: undefined,
}
