import React from "react"
import PropTypes from "prop-types"

import { isObject, isFunction } from "../../utils"

import { ShadowRoot } from "../ShadowRoot"

// theme and styles will be replaced with real values during the build process
// const theme = require("../../../tailwind.config.js").theme
const theme = "%THEME%"
const styles = "%STYLES%"

const StylesContext = React.createContext()

export const useStyles = () => React.useContext(StylesContext)

export const StyleProvider = ({ stylesWrapper, children }) => {
  React.useEffect(() => {
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

    let wrapper = document[stylesWrapper]

    // create and add style element
    if (wrapper) {
      const style = document.createElement("style")
      style.setAttribute("data-style-provider", stylesWrapper)
      if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = styles
      } else {
        style.appendChild(document.createTextNode(styles))
      }
      wrapper.prepend(style)
    }
  }, [])

  return (
    <StylesContext.Provider value={(styles, theme)}>
      {stylesWrapper === "shadowRoot" ? (
        <ShadowRoot mode="open" styles={styles}>
          {children}
        </ShadowRoot>
      ) : (
        <>
          {stylesWrapper === "inline" && (
            <style data-style-provider="inline">{styles}</style>
          )}
          {children}
        </>
      )}
    </StylesContext.Provider>
  )
}

StyleProvider.propTypes = {
  stylesWrapper: PropTypes.oneOfType([
    PropTypes.oneOf(["head", "inline", "shadowRoot"]),
  ]),
}

StyleProvider.defaultProps = {
  stylesWrapper: undefined,
}
