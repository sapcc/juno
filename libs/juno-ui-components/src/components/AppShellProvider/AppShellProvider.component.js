import React from "react"
import PropTypes from "prop-types"

import { StyleProvider, ShadowRoot, PortalProvider } from "../../index"

/**
 * This provider acts as a wrapper for Juno apps. It renders a StyleProvider and PortalProvider
 */
export const AppShellProvider = ({
  shadowRoot,
  shadowRootMode,
  stylesWrapper,
  children,
}) => {
  const Wrapper = React.useCallback(
    ({ children }) =>
      shadowRoot ? (
        <ShadowRoot mode={shadowRootMode}>{children}</ShadowRoot>
      ) : (
        children
      ),
    [shadowRoot, shadowRootMode]
  )
  return (
    <Wrapper>
      <StyleProvider stylesWrapper={shadowRoot ? "inline" : stylesWrapper}>
        <PortalProvider>{children}</PortalProvider>
      </StyleProvider>
    </Wrapper>
  )
}

AppShellProvider.propTypes = {
  /** Whether the app is rendered inside a ShadowRoot. Only choose false if the app is meant to run as a stand-alone application. */
  shadowRoot: PropTypes.bool,
  /** Shadow root mode */
  shadowRootMode: PropTypes.oneOf(["open", "closed"]),
  /** Where app stylesheets are imported. This is only relevant if shadowRoot === false. If you use a ShadowRoot the styles must be inline. */
  stylesWrapper: PropTypes.oneOf(["head", "inline"]),
}

// define default values
AppShellProvider.defaultProps = {
  shadowRoot: true,
  shadowRootMode: "open",
  stylesWrapper: "inline",
}
