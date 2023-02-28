import React, { useEffect } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import useStore from "./store"
import { useStore as useMessageStore } from "./messageStore"
import AppRouter from "./components/AppRouter"
import { MessagesStateProvider } from "./messageStore"
import { AppShell, PageHeader } from "juno-ui-components"
import HeaderUser from "./components/HeaderUser"
import styles from "./styles.scss"
import StyleProvider from "juno-ui-components"
import useCommunication from "./hooks/useCommunication"

const CustomPageHeader = () => {
  const auth = useStore((state) => state.auth)
  const logout = useStore((state) => state.logout)
  const loggedIn = useStore((state) => state.loggedIn)
  return (
    <PageHeader heading="Converged Cloud | Heureka">
      {loggedIn && <HeaderUser auth={auth} logout={logout} />}
    </PageHeader>
  )
}

const App = (props) => {
  const setEndpoint = useStore((state) => state.setEndpoint)
  useCommunication()

  useEffect(() => {
    if (props.endpoint) {
      setEndpoint(props.endpoint)
    }
  }, [props])

  // Create a client
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        pageHeader={<CustomPageHeader />}
        embedded={props.embedded === true}
      >
        <AppRouter props={props} />
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
      <MessagesStateProvider>
        <App {...props} />
      </MessagesStateProvider>
    </StyleProvider>
  )
}

export default StyledApp
