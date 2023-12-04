import React from "react"

import { AppShell, AppShellProvider } from "juno-ui-components"
import StoreProvider from "./components/StoreProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppContent from "./AppContent"
import styles from "./styles.scss"
import SideNav from "./components/SideNav"
import AsyncWorker from "./components/AsyncWorker"
import { MessagesProvider } from "messages-provider"

const App = (props = {}) => {
  // to be deleted
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        meta: {
          endpoint: props.endpoint || props.currentHost || "",
        },
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AsyncWorker />
      <AppShell
        pageHeader="Greenhouse Management"
        embedded={props.embedded === "true" || props.embedded === true}
        sideNavigation={<SideNav />}
      >
        <MessagesProvider>
          <AppContent {...props} />
        </MessagesProvider>
      </AppShell>
    </QueryClientProvider>
  )
}

const StyledApp = (props) => {
  return (
    <AppShellProvider theme={`${props.theme ? props.theme : "theme-dark"}`}>
      <style>{styles.toString()}</style>
      <StoreProvider options={props}>
        <App {...props} />
      </StoreProvider>
    </AppShellProvider>
  )
}

export default StyledApp
