import React, { useEffect } from "react"
import styles from "./styles.scss"
import {
  AppShellProvider,
  AppShell,
  PageHeader,
  Container,
} from "juno-ui-components"
import { oidcSession, mockedSession } from "oauth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppContent from "./components/AppContent"
import HeaderUser from "./components/auth/HeaderUser"
import AsyncWorker from "./components/AsyncWorker"
import StoreProvider, {
  useGlobalsActions,
  useAuthActions,
} from "./components/StoreProvider"
import { MessagesProvider } from "messages-provider"

// mock API
import { fetchProxyInitDB } from "utils"
import db from "../db.json"

const App = (props = {}) => {
  const { setEndpoint } = useGlobalsActions()
  const { setData } = useAuthActions()

  // Create query client which it can be used from overall in the app
  const queryClient = new QueryClient()

  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  useEffect(() => {
    // set default endpoint so the useQueryClientFn can be used
    setEndpoint(props.endpoint || window.location.origin)
  }, [])

  // fetch the mocked auth object and save it globally
  const oidc = React.useMemo(() => {
    // force fetch mocked session
    return mockedSession({
      initialLogin: true,
      onUpdate: (data) => {
        setData(data)
      },
    })
  }, [])

  // setup the mock db.json
  useEffect(() => {
    fetchProxyInitDB(db)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AsyncWorker consumerId={props.id} mockAPI={true} />
      <AppShell
        pageHeader={
          <PageHeader heading="Converged Cloud | Example App">
            <HeaderUser login={oidc.login} logout={oidc.logout} />
          </PageHeader>
        }
        embedded={props.embedded === "true" || props.embedded === true}
      >
        <Container py>
          <AppContent props={props} />
        </Container>
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
        <StoreProvider>
          <App {...props} />
        </StoreProvider>
      </MessagesProvider>
    </AppShellProvider>
  )
}
export default StyledApp
