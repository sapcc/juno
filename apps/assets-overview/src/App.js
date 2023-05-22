import React from "react"

import useStore from "./store"
import { AppShell, AppShellProvider } from "juno-ui-components"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppContent from "./AppContent"
import styles from "./styles.scss"
import { MessagesProvider, useActions } from "messages-provider"
import markdown from "github-markdown-css/github-markdown.css"
import markdownDark from "github-markdown-css/github-markdown-dark.css"
import markdownLight from "github-markdown-css/github-markdown-light.css"
import CustomPageHeader from "./components/CustomPageHeader"

const App = (props = {}) => {
  const setManifestUrl = useStore((state) => state.setManifestUrl)
  const setAssetsUrl = useStore((state) => state.setAssetsUrl)
  const { addMessage } = useActions()

  // Create query client which it can be used from overall in the app
  const queryClient = new QueryClient()

  // setup assets url and manifest url
  React.useEffect(() => {
    try {
      const url = new URL(
        "/manifest.json",
        props.assetsUrl || props.currentHost
      )
      setAssetsUrl(url.origin)
      setManifestUrl(url.href)
    } catch (e) {
      addMessage({
        variant: "error",
        text: `Bad required assetsUrl data prop - ${e.message}`,
      })
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        pageHeader={CustomPageHeader}
        embedded={props.embedded === "true" || props.embedded === true}
      >
        <AppContent props={props} />
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
      <MessagesProvider>
        <App {...props} />
      </MessagesProvider>
    </AppShellProvider>
  )
}

export default StyledApp
