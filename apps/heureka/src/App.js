import React, { useEffect } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import useStore from "./hooks/useStore"
import AppRouter from "./components/AppRouter"
import { MessagesProvider } from "messages-provider"
import { AppShell, AppShellProvider } from "juno-ui-components"
import styles from "./styles.scss"
import useCommunication from "./hooks/useCommunication"
import CustomPageHeader from "./components/CustomPageHeader"

const URL_STATE_KEY = "heureka"

const App = (props) => {
  const setEndpoint = useStore((state) => state.setEndpoint)
  const setUrlStateKey = useStore((state) => state.setUrlStateKey)
  const setEmbedded = useStore((state) => state.setEmbedded)

  useCommunication()

  useEffect(() => {
    if (props.endpoint) {
      setEndpoint(props.endpoint)
    }
    setEmbedded(props?.embedded === true || props?.embedded === "true")
  }, [props])

  useEffect(() => {
    setUrlStateKey(URL_STATE_KEY)
  }, [])

  // Create a client
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        pageHeader={<CustomPageHeader />}
        embedded={props.embedded === true || props.embedded === "true"}
      >
        <AppRouter props={props} />
      </AppShell>
    </QueryClientProvider>
  )
}

const StyledApp = (props) => {
  return (
    <AppShellProvider theme={`${props.theme ? props.theme : "theme-dark"}`}>
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <MessagesProvider>
        <App {...props} />
      </MessagesProvider>
    </AppShellProvider>
  )
}

export default StyledApp
