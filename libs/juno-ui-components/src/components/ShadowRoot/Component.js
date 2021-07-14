/**
 * This module inserts a shadow dom element inline.
 * In addition to the properties 'mode' and 'delegateFocus',
 * it also accepts styles. Where styles is a string.
 * The component automatically converts it to CSSStyleSheet,
 * if supported by the browser. Otherwise there is a fallback to
 * inline style element.
 * @module ShadowRoot
 */
import ReactDOM from "react-dom"
import React from "react"
import PropTypes from "prop-types"

// check if constructable styles are supported by browser.
const constructableStylesheetsSupported =
  window &&
  window.ShadowRoot &&
  window.ShadowRoot.prototype.hasOwnProperty("adoptedStyleSheets") &&
  window.CSSStyleSheet &&
  window.CSSStyleSheet.prototype.hasOwnProperty("replace")

// function to convert styles string to CSSStyleSheet
const toStyleSheet = (styles) => {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(styles)
  return [sheet]
}

/**
 * Functional component which creates and inserts a shadow dom element
 * in to the current parent element. If styles are given, these and
 * the children are added to the shadow element. The themeClass is added to a wrapper div surrounding the children.
 * @param {Object} props
 * @returns {function} component
 */
export const ShadowRoot = ({ mode, delegatesFocus, styles, themeClass, children }) => {
  // reference element which is replaced by the shadow dom element
  const placeholder = React.useRef()
  // hold shadow element in the state
  const [shadowRoot, setShadowRoot] = React.useState()

  const stylesWithFont = React.useMemo(() => {
    // add import for font to styles
    return "@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital@0;1&family=IBM+Plex+Sans+Condensed:ital@0;1&family=IBM+Plex+Sans:ital,wght@0,100;0,400;0,700;1,100;1,400;1,700&family=IBM+Plex+Serif:ital@0;1&display=swap'); " + styles
  }, [styles])


  React.useEffect(() => {
    // wait until the reference element is rendered!
    if (!placeholder.current) return
    // create the shadow dom element
    const shadowRootElement = placeholder.current.parentNode.attachShadow({
      delegatesFocus,
      mode,
    })

    // apply styles if given
    if (stylesWithFont && constructableStylesheetsSupported) {
      shadowRootElement.adoptedStyleSheets = toStyleSheet(stylesWithFont)
    }

    // save shadow element in the state
    setShadowRoot(shadowRootElement)
  }, [placeholder.current, stylesWithFont])

  // if shadow element is available place children and styles iside it and return.
  // otherwise render the reference element
  return shadowRoot ? (
    ReactDOM.createPortal(
      <>
        {!constructableStylesheetsSupported && <style>{stylesWithFont}</style>}
        
        <div className={`shadow-body ${themeClass}`}>
          {children}
        </div>
      </>,
      shadowRoot
    )
  ) : (
    <span ref={placeholder}></span>
  )
}

// define accepted properties
ShadowRoot.propTypes = {
  mode: PropTypes.oneOf(["open", "closed"]),
  delegatesFocus: PropTypes.bool,
  styles: PropTypes.string,
}

// default values for properties
ShadowRoot.defaultProps = {
  mode: "open",
  delegatesFocus: false,
}
