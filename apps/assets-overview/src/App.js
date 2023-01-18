import React from "react"

import useStore from "./store"
import { AppShell } from "juno-ui-components"
import { QueryClient, QueryClientProvider } from "react-query"
import AppContent from "./AppContent"
import styles from "./styles.scss"
import StyleProvider from "juno-ui-components"
import { MessagesProvider } from "messages-provider"
import markdownDark from "github-markdown-css/github-markdown-dark.css"
import markdownLight from "github-markdown-css/github-markdown-light.css"

const URL_STATE_KEY = "assets-overview"

const App = (props) => {
  const setManifestUrl = useStore((state) => state.setManifestUrl)
  const setOrigin = useStore((state) => state.setOrigin)
  const setRegion = useStore((state) => state.setRegion)
  const setUrlStateKey = useStore((state) => state.setUrlStateKey)
  const { embedded } = props

  // Create query client which it can be used from overall in the app
  const queryClient = new QueryClient()

  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  React.useEffect(() => {
    // extract origin and region from the manifest url
    const url = new URL(props.manifestUrl)
    setOrigin(url.origin)
    setRegion(url.origin.match(/.*\.(.+)\..+\..+$/)[1])
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
  const theme = props.theme ? props.theme : "theme-dark"
  return (
    <StyleProvider stylesWrapper="shadowRoot" theme={theme}>
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <style>
        {theme === "theme-dark"
          ? markdownDark.toString()
          : markdownLight.toString()}
      </style>
      <App {...props} />
    </StyleProvider>
  )
}

export default StyledApp
