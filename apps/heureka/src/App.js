import React, { useEffect } from "react"
import { useOidcAuth } from "oauth"
import { QueryClient, QueryClientProvider } from "react-query"
import useStore from "./store"
import { useStore as useMessageStore } from "./messageStore"
import AppRouter from "./components/AppRouter"
import { MessagesStateProvider } from "./messageStore"
import { AppShell, PageHeader } from "juno-ui-components"
import HeaderUser from "./components/HeaderUser"

const App = (props) => {
  const setMessage = useMessageStore((state) => state.setMessage)
  const setEndpoint = useStore((state) => state.setEndpoint)
  const setAuth = useStore((state) => state.setAuth)

  const { auth, loggedIn, logout, login } = useOidcAuth({
    issuerURL: props.issuerurl,
    clientID: props.clientid,
    initialLogin: true,
  })

  useEffect(() => {
    if (!auth) return null
    if (auth?.error) {
      setMessage({
        variant: "error",
        text: auth?.error,
      })
    }

    setAuth(auth)
    if (props.endpoint) {
      setEndpoint(props.endpoint)
    }
  }, [auth])

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

// export default App

export default (props) => (
  <MessagesStateProvider>
    <App {...props} />
  </MessagesStateProvider>
)
