import React, { useEffect } from "react"
import styles from "./styles.scss"
import { AppShell, AppShellProvider } from "juno-ui-components"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MessagesProvider } from "messages-provider"
import AsyncWorker from "./components/AsyncWorker"
import StoreProvider, { useActions } from "./components/StoreProvider"
import AppRouter from "./components/AppRouter"

const App = (props) => {
  // Create a client
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AsyncWorker consumerId={props.id} />
      <AppShell
        pageHeader="Converged Cloud | Heureka"
        embedded={props.embedded === "true" || props.embedded === true}
      >
        <AppRouter />
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
        <StoreProvider options={props}>
          <App {...props} />
        </StoreProvider>
      </MessagesProvider>
    </AppShellProvider>
  )
}

export default StyledApp
