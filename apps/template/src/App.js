import React, { useCallback } from "react"

import useStore from "./store"
import { AppShell } from "juno-ui-components"
import { QueryClient, QueryClientProvider } from "react-query"
import AppContent from "./AppContent"

/* IMPORTANT: Replace this with your app's name */
const URL_STATE_KEY = "template"
/* --------------------------- */

const App = (props) => {
  const setEndpoint = useStore((state) => state.setEndpoint)
  const setUrlStateKey = useStore((state) => state.setUrlStateKey)
  const { embedded } = props
  // Create query client which it can be used from overall in the app
  const queryClient = new QueryClient()

  // on initial load save Endpoint and URL_STATE_KEY
  React.useEffect(() => {
    // set to empty string to fetch local test data
    setEndpoint(props.endpoint || "")
    setUrlStateKey(URL_STATE_KEY)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        pageHeader="Converged Cloud | App Template"
        contentHeading="App template page title"
        embedded={embedded === "true"}
      >
        <AppContent props={props} />
      </AppShell>
    </QueryClientProvider>
  )
}

export default App
