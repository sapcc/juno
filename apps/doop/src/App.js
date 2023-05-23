import React from "react"

import useStore from "./store"
import StyleProvider, { AppShell } from "juno-ui-components"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import styles from "./styles.scss"

/* IMPORTANT: Replace this with your app's name */
const URL_STATE_KEY = "doop"
/* --------------------------- */

const App = (props = {}) => {
  const setEndpoint = useStore((state) => state.setEndpoint)
  const setUrlStateKey = useStore((state) => state.setUrlStateKey)
  // Create query client which it can be used from overall in the app
  const queryClient = new QueryClient()

  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  React.useEffect(() => {
    // set to empty string to fetch local test data in dev mode
    setEndpoint(props.endpoint || props.currentHost || "")
    setUrlStateKey(URL_STATE_KEY)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        pageHeader="Converged Cloud | Doop"
        contentHeading="Doop"
        embedded={props.embedded === "true" || props.embedded === true}
      >
        Doop Content
      </AppShell>
    </QueryClientProvider>
  )
}

const StyledApp = (props) => {
  return (
    <StyleProvider
      stylesWrapper="shadowRoot"
      theme={`${props.theme ? props.theme : "theme-dark"}`}
    >
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <App {...props} />
    </StyleProvider>
  )
}

export default StyledApp
