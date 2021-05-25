import ReactDOM from "react-dom"
import React from "react"
import PropTypes from "prop-types"

const constructableStylesheetsSupported =
  window &&
  window.ShadowRoot &&
  window.ShadowRoot.prototype.hasOwnProperty("adoptedStyleSheets") &&
  window.CSSStyleSheet &&
  window.CSSStyleSheet.prototype.hasOwnProperty("replace")

const toStyleSheet = (styles) => {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(styles)
  return [sheet]
}

export const ShadowRoot = ({ mode, delegatesFocus, styles, children }) => {
  const placeholder = React.useRef()
  const [shadowRoot, setShadowRoot] = React.useState()

  React.useEffect(() => {
    if (!placeholder.current) return
    const shadowRootElement = placeholder.current.parentNode.attachShadow({
      delegatesFocus,
      mode,
    })
    if (styles && constructableStylesheetsSupported) {
      shadowRootElement.adoptedStyleSheets = toStyleSheet(styles)
    }

    setShadowRoot(shadowRootElement)
  }, [placeholder.current, styles])

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

ShadowRoot.propTypes = {
  mode: PropTypes.oneOf(["open", "closed"]),
  delegatesFocus: PropTypes.bool,
  styles: PropTypes.string,
}

ShadowRoot.defaultProps = {
  mode: "open",
  delegatesFocus: false,
}
