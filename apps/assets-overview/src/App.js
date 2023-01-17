import React from "react"

import useStore from "./store"
import { AppShell } from "juno-ui-components"
import { QueryClient, QueryClientProvider } from "react-query"
import AppContent from "./AppContent"
import styles from "./styles.scss"
import StyleProvider from "juno-ui-components"
import { MessagesProvider } from "messages-provider"

/* IMPORTANT: Replace this with your app's name */
const URL_STATE_KEY = "assets-overview"
/* --------------------------- */

const App = (props) => {
  const setManifestUrl = useStore((state) => state.setManifestUrl)
  const setUrlStateKey = useStore((state) => state.setUrlStateKey)
  const { embedded } = props
  // Create query client which it can be used from overall in the app
  const queryClient = new QueryClient()

  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  React.useEffect(() => {
    setManifestUrl(props.manifestUrl)
    setUrlStateKey(URL_STATE_KEY)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        pageHeader="Converged Cloud | Juno Assets Overview"
        contentHeading=""
        embedded={embedded === "true"}
      >
        <MessagesProvider>
          <AppContent props={props} />
        </MessagesProvider>
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
