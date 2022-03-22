import React, { useRef, useEffect, useCallback } from "react"

import { QueryClient, QueryClientProvider } from "react-query"
import useStore from "./store"
import ServicesList from "./components/ServicesList"

import {
  AppShell,
  AppBody,
  AppIntro,
  Button,
  ContentArea,
  ContentAreaHeading,
  ContentAreaToolbar,
  ContentAreaWrapper,
  ContentContainer,
  MainContainer,
  Message,
  PageFooter,
  PageHeader,
  Spinner,
} from "juno-ui-components"
import { currentState, push } from "url-state-provider"

const URL_STATE_KEY = "Heureka"

const App = (props) => {
  const [processing, setProcessing] = React.useState(false)
  const [items, setItems] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [statusCode, setStatusCode] = React.useState(null)
  const { embedded } = props

  useEffect(() => {
    if (props.endpoint) {
      useStore.setState({ endpoint: props.endpoint })
    }
  }, [props.endpoint])

  // Create a client
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        pageHeader="Converged Cloud | Heureka"
        contentHeading="Services"
      >
        {/* <Message>Welcome to the example app</Message> */}
        {/* <ContentAreaToolbar>
        <Button icon="addCircle" onClick={openNewItemForm}>
          Add Action
        </Button>
      </ContentAreaToolbar> */}
        <ServicesList />
      </AppShell>
    </QueryClientProvider>
  )
}

export default App
