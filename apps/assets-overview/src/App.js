import React from "react"

import useStore from "./store"
import { AppShell, AppShellProvider } from "juno-ui-components"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppContent from "./AppContent"
import styles from "./styles.scss"
import { MessagesProvider } from "messages-provider"
import markdown from "github-markdown-css/github-markdown.css"
import markdownDark from "github-markdown-css/github-markdown-dark.css"
import markdownLight from "github-markdown-css/github-markdown-light.css"
import CustomPageHeader from "./components/CustomPageHeader"

const App = (props = {}) => {
  const setManifestUrl = useStore((state) => state.setManifestUrl)
  const setAssetsUrl = useStore((state) => state.setAssetsUrl)

  // Create query client which it can be used from overall in the app
  const queryClient = new QueryClient()

  const embedded = props.embedded === "true" || props.embedded === true

  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  React.useEffect(() => {
    // default is /manifest.json
    let manifestUrl = `${props.assetsUrl}/manifest.json` || "/manifest.json"
    // if manifestUrl does not start with http use current origin as prefix
    if (manifestUrl.indexOf("http") < 0) {
      // ensure first char is a "/"
      if (manifestUrl[0] !== "/") manifestUrl = "/" + manifestUrl
      manifestUrl = window.location.origin + manifestUrl
    }
    setManifestUrl(manifestUrl)
    setAssetsUrl(props.assetsUrl)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell pageHeader={CustomPageHeader} embedded={embedded}>
        <MessagesProvider>
          <AppContent props={props} />
        </MessagesProvider>
      </AppShell>
    </QueryClientProvider>
  )
}

// the list styles are being reseted bei juno
// add them back so it works within a markdown container
const fixMarkdownLists = `
  ol {
      list-style: decimal;
  }
  ul {
    list-style: disc;
}
`

const StyledApp = (props) => {
  const theme = props.theme ? props.theme : "theme-dark"
  return (
    <AppShellProvider theme={theme}>
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <style>{markdown.toString()}</style>
      <style>
        {theme === "theme-dark"
          ? markdownDark.toString()
          : markdownLight.toString()}
      </style>
      <style>{fixMarkdownLists}</style>
      <App {...props} />
    </AppShellProvider>
  )
}

export default StyledApp
