import React, { useEffect } from "react"

import { QueryClient, QueryClientProvider } from "react-query"
import useStore from "./store"
import ServicesList from "./components/ServicesList"
import { MessagesStateProvider } from "./messageStore"
import Messages from "./components/Messages"

import { AppShell } from "juno-ui-components"

const URL_STATE_KEY = "Heureka"

const App = (props) => {
  useEffect(() => {
    if (props.endpoint) {
      useStore.setState({ endpoint: props.endpoint })
    }
  }, [props.endpoint])

  // Create a client
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <MessagesStateProvider>
        <AppShell
          pageHeader="Converged Cloud | Heureka"
          contentHeading="Services"
        >
          <Messages />
          <ServicesList />
        </AppShell>
      </MessagesStateProvider>
    </QueryClientProvider>
  )
}

export default App
