import React, { useEffect } from "react"

import { AppShell, AppShellProvider } from "juno-ui-components"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import styles from "./styles.scss"
import AppContent from "./AppContent"
import AsyncWorker from "./components/AsyncWorker"
import StoreProvider, { useGlobalsActions } from "./components/StoreProvider"

// IMPORTANT: Replace this with your app's name
const URL_STATE_KEY = "exampleapp"

const App = (props = {}) => {
  const { setEndpoint, setUrlStateKey } = useGlobalsActions()

  // Create query client which it can be used from overall in the app
  const queryClient = new QueryClient()

  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  useEffect(() => {
    setEndpoint(props.endpoint)
    setUrlStateKey(URL_STATE_KEY)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AsyncWorker />
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
