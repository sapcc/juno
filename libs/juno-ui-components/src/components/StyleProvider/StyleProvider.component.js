/**
 * This module implements the style provider component.
 * It accepts the property 'stylesWrapper' which decides where
 * to place the ui-components styles.
 * @module StyleProvider
 */
import React, { useCallback, useRef } from "react"
import PropTypes from "prop-types"
import { ShadowRoot } from "../ShadowRoot/index"
import theme from "../../../tailwind.config"
import Fonts from "./Fonts"
import GlobalStyles, { styles } from "./GlobalStyles"

// create the context for values to be provided to the nested components.
const StylesContext = React.createContext()

const APP_BODY_CSS_CLASS_NAME = "juno-app-body"
/**
 * Functional component wich inserts the ui styles. It also creates a
 * shadow dom element with styes inside it if 'stylesWrapper' is equal
 * to "shadowRoot".
 * Accepted values for 'stylesWrapper' are 'head', 'inline' and 'shadowRoot'.
 * New since 29.03.2023
 * We have completely reworked this component. Both this component and ShadowRoot
 * can be used independently. The stylesWrapper parameter is set to "inline" by default.
 * If you want to use StyleProvider without inline styles, then the value of this
 * parameter should be changed to "head".
 * Examples:
 * Standalone:
 * * <StyleProvider stylesWrapper="head">Content</StyleProvider>
 *   styles and fonts are added to the document.head
 * * <StyleProvider>Content</StyleProvider>
 *   styles and fonts are added inline
 * ShadowRoot:
 *   <ShadowRoot><StyleProvider>Content</StyleProvider></ShadowRoot>
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
  const customCssClasses = useRef(APP_BODY_CSS_CLASS_NAME + " " + themeClass)
  const container = useRef()

  // Deprecated!
  // Only necessary in case the stylesWrapper is set to shadowRoot.
  // This functionality exists to provide backwards compatibility.
  // Should be removed in perspective
  const Wrapper = React.useCallback(
    ({ children }) => {
      if (stylesWrapper === "shadowRoot")
        return <ShadowRoot mode={shadowRootMode}>{children}</ShadowRoot>
      return children
    },
    [stylesWrapper, shadowRootMode]
  )

  // this function makes it possible to change container css class on the fly
  const setCustomCssClasses = useCallback((value) => {
    if (!container.current || typeof value !== "string") return
    container.current.className = `${APP_BODY_CSS_CLASS_NAME} ${themeClass} ${value}`
  }, [])

  return (
    <Wrapper>
      <Fonts inline={stylesWrapper !== "head"} />
      <GlobalStyles inline={stylesWrapper !== "head"} />
      <StylesContext.Provider value={{ styles, theme, setCustomCssClasses }}>
        <div className={customCssClasses.current} ref={container}>
          {children}
        </div>
      </StylesContext.Provider>
    </Wrapper>
  )
}

StyleProvider.propTypes = {
  children: PropTypes.node,
  stylesWrapper: PropTypes.oneOfType([
    PropTypes.oneOf(["head", "inline", "shadowRoot"]),
  ]),
  theme: PropTypes.string,
  shadowRootMode: PropTypes.oneOf(["open", "closed"]),
}

// define default values
StyleProvider.defaultProps = {
  children: null,
  stylesWrapper: "inline",
  theme: undefined,
}

// export a helper hook to use styles in nested components
// returns {styles, theme, setCustomCssClasses}
StyleProvider.useStyles = () => React.useContext(StylesContext)
