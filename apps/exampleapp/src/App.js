import React, { useEffect } from "react"

import { AppShellProvider } from "juno-ui-components"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import styles from "./styles.scss"
import AppShell from "./components/AppShell"
import AppContent from "./components/AppContent"
import AsyncWorker from "./components/AsyncWorker"
import StoreProvider, { useGlobalsActions } from "./components/StoreProvider"

const App = (props = {}) => {
  const { setEndpoint } = useGlobalsActions()

  // Create query client which it can be used from overall in the app
  const queryClient = new QueryClient()

  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  useEffect(() => {
    // set default endpoint so the useQueryClientFn can be used
    setEndpoint(props.endpoint || window.location.origin)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AsyncWorker consumerId={props.id} />
      <AppShell
        pageHeader="Converged Cloud | Example App"
        contentHeading="Example App"
        embedded={props.embedded === "true" || props.embedded === true}
      >
        <AppContent props={props} />
      </AppShell>
    </QueryClientProvider>
  )
}

const StyledApp = (props) => {
  return (
    <AppShellProvider theme={`${props.theme ? props.theme : "theme-dark"}`}>
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <StoreProvider>
        <App {...props} />
      </StoreProvider>
    </AppShellProvider>
  )
}
export default StyledApp
