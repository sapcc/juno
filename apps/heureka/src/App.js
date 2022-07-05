import React, { useEffect } from "react"

import { QueryClient, QueryClientProvider } from "react-query"
import useStore from "./store"
import AppRouter from "./components/AppRouter"
import Breadcrumb from "./components/Breadcrumb"
import { MessagesStateProvider } from "./messageStore"
import Messages from "./components/Messages"
import { AppShell, Container } from "juno-ui-components"

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
        <AppShell pageHeader="Converged Cloud | Heureka">
          <Container>
            <Messages />
            <Breadcrumb />
            <AppRouter props={props} />
          </Container>
        </AppShell>
      </MessagesStateProvider>
    </QueryClientProvider>
  )
}

export default App
