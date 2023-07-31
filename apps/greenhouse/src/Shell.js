import React, { useLayoutEffect } from "react"

import { useGlobalsActions } from "./hooks/useStore"
import ShellLayout from "./components/layout/ShellLayout"
import Auth from "./components/Auth"
import styles from "./styles.scss"
import { AppShellProvider } from "juno-ui-components"
import useCommunication from "./hooks/useCommunication"
import PluginContainer from "./components/PluginContainer"
import useUrlState from "./hooks/useUrlState"

const Shell = (props = {}) => {
  const { setApiEndpoint, setAssetsHost, setDemoUserToken } =
    useGlobalsActions()

  useCommunication()
  useUrlState()

  // INIT
  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  useLayoutEffect(() => {
    if (!setApiEndpoint || !setAssetsHost || !setDemoUserToken) return
    // set to empty string to fetch local test data in dev mode
    setApiEndpoint(props.apiEndpoint)
    setAssetsHost(props.currentHost)
    setDemoUserToken(props.demoUserToken)
  }, [setApiEndpoint, setAssetsHost, setDemoUserToken])

  return (
    <Auth
      clientId={props?.authClientId}
      issuerUrl={props?.authIssuerUrl}
      demoOrg={props?.demoOrg}
      mock={props?.mockAuth}
    >
      <ShellLayout>
        <PluginContainer />
      </ShellLayout>
    </Auth>
  )
}

const StyledShell = (props) => {
  return (
    <AppShellProvider>
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <Shell {...props} />
    </AppShellProvider>
  )
}

export default StyledShell
