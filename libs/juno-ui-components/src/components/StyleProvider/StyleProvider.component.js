/**
 * This module implements the style provider component.
 * It accepts the property 'stylesWrapper' which decides where
 * to place the ui-components styles.
 * @module StyleProvider
 */
import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { ShadowRoot } from "../ShadowRoot"
import theme from "../../../tailwind.config"
import Fonts from "./Fonts"
import GlobalStyles, { styles } from "./GlobalStyles"

// create the context for values to be provided to the nested components.
const StylesContext = React.createContext()

const Provider = ({ themeClass, children }) => {
  // manage custom css classes (useStyles)
  const [customCssClasses, setCustomCssClasses] = React.useState("")

  return (
    <StylesContext.Provider value={{ styles, theme, setCustomCssClasses }}>
      <div className={`${themeClass} ${customCssClasses || ""}`}>
        {children}
      </div>
    </StylesContext.Provider>
  )
}

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

  const Wrapper = React.useCallback(
    ({ children }) => {
      if (stylesWrapper === "shadowRoot")
        return <ShadowRoot mode={shadowRootMode}>{children}</ShadowRoot>
      return children
    },
    [stylesWrapper, shadowRootMode]
  )

  return (
    <Wrapper>
      <Fonts inline={stylesWrapper === "shadowRoot"} />
      <GlobalStyles inline={["shadowRoot", "inline"].includes(stylesWrapper)} />
      <Provider themeClass={themeClass}>{children}</Provider>
    </Wrapper>
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

// export a helper hook to use styles in nested components
// returns {styles, theme, setCustomCssClasses}
StyleProvider.useStyles = () => React.useContext(StylesContext)
