import React, { useEffect } from "react"
import { useOidcAuth } from "oauth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import useStore from "./store"
import { useStore as useMessageStore } from "./messageStore"
import AppRouter from "./components/AppRouter"
import { MessagesStateProvider } from "./messageStore"
import { AppShell, PageHeader } from "juno-ui-components"
import HeaderUser from "./components/HeaderUser"
import styles from "./styles.scss"
import StyleProvider from "juno-ui-components"

const App = (props) => {
  const setMessage = useMessageStore((state) => state.setMessage)
  const setEndpoint = useStore((state) => state.setEndpoint)
  const setAuth = useStore((state) => state.setAuth)
  const setLoggedIn = useStore((state) => state.setLoggedIn)
  const setLoggedOut = useStore((state) => state.setLoggedOut)
  const setLogin = useStore((state) => state.setLogin)

  const { auth, loggedIn, logout, login } = useOidcAuth({
    issuerURL: props.issuerurl,
    clientID: props.clientid,
    initialLogin: true,
  })

  useEffect(() => {
    if (auth?.error) {
      // display error message
      setMessage({
        variant: "error",
        text: auth?.error,
      })
    }

    setAuth(auth)
    setLoggedIn(loggedIn)
    setLogin(login)
    setLoggedOut(logout)
  }, [auth, loggedIn, logout])

  useEffect(() => {
    if (props.endpoint) {
      setEndpoint(props.endpoint)
    }
  }, [props])

  const customPageHeader = React.useMemo(() => {
    return (
      <PageHeader heading="Converged Cloud | Heureka">
        {loggedIn && <HeaderUser auth={auth} logout={logout} />}
      </PageHeader>
    )
  }, [loggedIn, logout, auth])

  // Create a client
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell pageHeader={customPageHeader}>
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
