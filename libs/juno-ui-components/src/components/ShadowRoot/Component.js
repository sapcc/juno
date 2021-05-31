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
 * the children are added to the shadow element.
 * @param {Object} props
 * @returns {function} component
 */
export const ShadowRoot = ({ mode, delegatesFocus, styles, children }) => {
  // reference element which is replaced by the shadow dom element
  const placeholder = React.useRef()
  // hold shadow element in the state
  const [shadowRoot, setShadowRoot] = React.useState()

  React.useEffect(() => {
    // wait until the reference element is rendered!
    if (!placeholder.current) return
    // create the shadow dom element
    const shadowRootElement = placeholder.current.parentNode.attachShadow({
      delegatesFocus,
      mode,
    })
    // apply styles if given
    if (styles && constructableStylesheetsSupported) {
      shadowRootElement.adoptedStyleSheets = toStyleSheet(styles)
    }

    // save shadow element in the state
    setShadowRoot(shadowRootElement)
  }, [placeholder.current, styles])

  // if shadow element is available place children and styles iside it and return.
  // otherwise render the reference element
  return shadowRoot ? (
    ReactDOM.createPortal(
      <>
        {!constructableStylesheetsSupported && <style>{styles}</style>}
        {children}
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
