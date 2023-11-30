import React, { useLayoutEffect } from "react"

import { AppShell, AppShellProvider } from "juno-ui-components"
import StoreProvider, { useActions } from "./components/StoreProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppContent from "./AppContent"
import styles from "./styles.scss"
import SideNav from "./components/SideNav"
import AsyncWorker from "./components/AsyncWorker"

const App = (props = {}) => {
  const { setApiEndpoint, setAssetsUrl } = useActions()

  // Create query client which it can be used from overall in the app
  // set default endpoint to fetch data
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        meta: {
          endpoint: props.endpoint || props.currentHost || "",
        },
      },
    },
  })

  useLayoutEffect(() => {
    if (!props.apiEndpoint)
      console.warn("[greenhouse-management]: api endpoint not set")
    if (!props.assetsUrl)
      console.warn("[greenhouse-management]: assets url not set")

    // Make this two props required
    if (!props.apiEndpoint || !props.assetsUrl) return

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", props)

    setApiEndpoint(props.apiEndpoint)
    setAssetsUrl(props.assetsUrl)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        pageHeader="Greenhouse Management"
        embedded={props.embedded === "true" || props.embedded === true}
        sideNavigation={<SideNav />}
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
        <AsyncWorker />
        <App {...props} />
      </StoreProvider>
    </AppShellProvider>
  )
}

export default StyledApp
