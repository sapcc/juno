import React from "react"
import PropTypes from "prop-types"

import { ShadowRoot, StyleProvider, PortalProvider } from "../../index"

/**
 * This provider acts as a wrapper for Juno apps.
 */
export const AppShellProvider = ({ shadowRoot, shadowRootMode, children }) => {
  return (
    <ShadowRoot>
      <StyleProvider stylesWrapper={shadowRoot ? "inline" : styleImport}>
        <PortalProvider>{children}</PortalProvider>
      </StyleProvider>
    </ShadowRoot>
  )
}

AppShellProvider.propTypes = {
  /** Whether the app is rendered inside a ShadowRoot. Only choose false if the app is meant to run as a stand-alone application. */
  shadowRoot: PropTypes.bool,
  /** Shadow root mode */
  shadowRootMode: PropTypes.oneOf(["open", "closed"]),
  /** Where app stylesheets are imported. This is only relevant if shadowRoot === false. If you use a ShadowRoot the styles must be inline. */
  styleImport: PropTypes.oneOf(["head", "inline"]),
}

// define default values
AppShellProvider.defaultProps = {
  shadowRoot: true,
  shadowRootMode: "open",
  styleImport: "inline",
}
