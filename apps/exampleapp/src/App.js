import React from "react"

import useStore from "./store"
import { AppShell } from "juno-ui-components"
import { QueryClient, QueryClientProvider } from "react-query"
import styles from "./styles.scss"
import StyleProvider from "juno-ui-components"
import AppContent from "./AppContent"

// IMPORTANT: Replace this with your app's name
const URL_STATE_KEY = "exampleapp"

const App = (props) => {
  const setEndpoint = useStore((state) => state.setEndpoint)
  const setUrlStateKey = useStore((state) => state.setUrlStateKey)
  const { embedded } = props
  // Create query client which it can be used from overall in the app
  const queryClient = new QueryClient()

  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  React.useEffect(() => {
    // set to empty string to fetch local test data in dev mode
    setEndpoint(props.endpoint || "")
    setUrlStateKey(URL_STATE_KEY)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        pageHeader="Converged Cloud | Example App"
        contentHeading="Example App"
        embedded={embedded === "true"}
      >
        <AppContent props={props} />
      </AppShell>
    </QueryClientProvider>
  )
}

const StyledApp = (props) => {
  // default props
  props = {
    endpoint: process.env.ENDPOINT,
    theme: process.env.THEME,
    embedded: process.env.EMBEDDED,
    ...props,
  }
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
