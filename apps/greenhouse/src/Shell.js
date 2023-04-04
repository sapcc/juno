import React, { useLayoutEffect } from "react"

import useStore from "./hooks/useStore"
import ShellLayout from "./components/layout/ShellLayout"
import Auth from "./components/Auth"
import styles from "./styles.scss"
import StyleProvider from "juno-ui-components"
import useCommunication from "./hooks/useCommunication"
import PluginContainer from "./components/PluginContainer"
import useUrlState from "./hooks/useUrlState"

const Shell = (props = {}) => {
  const setApiEndpoint = useStore((state) => state.setApiEndpoint)
  const setAssetsHost = useStore((state) => state.setAssetsHost)

  useCommunication()
  useUrlState()

  // INIT
  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  useLayoutEffect(() => {
    if (!setApiEndpoint || !setAssetsHost) return
    // set to empty string to fetch local test data in dev mode
    setApiEndpoint(props.apiEndpoint)
    setAssetsHost(props.currentHost)
  }, [setApiEndpoint, setAssetsHost])

  return (
    <Auth clientId={props?.authClientId} issuerUrl={props?.authIssuerUrl}>
      <ShellLayout>
        <PluginContainer />
      </ShellLayout>
    </Auth>
  )
}

const StyledShell = (props) => {
  return (
    <StyleProvider
      stylesWrapper="shadowRoot"
      theme={`${props.theme ? props.theme : "theme-dark"}`}
    >
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <Shell {...props} />
    </StyleProvider>
  )
}

export default StyledShell
