import React, { useEffect } from "react"
import { useOidcAuth } from "oauth"
import { QueryClient, QueryClientProvider } from "react-query"
import { StateProvider, useDispatch } from "./components/StateProvider"
import reducers from "./reducers"
import {
  MessagesStateProvider,
  useMessagesDispatch,
} from "./components/MessagesProvider"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import styles from "./styles.scss"
import StyleProvider from "juno-ui-components"
import AppContent from "./AppContent"

const App = (props) => {
  const dispatch = useDispatch()
  const dispatchMessage = useMessagesDispatch()

  const oidc = useOidcAuth({
    issuerURL: props.issuerurl,
    clientID: props.clientid,
    initialLogin: true,
  })

  // on load application save the props to be used in oder components
  useEffect(() => {
    if (oidc?.auth?.error) {
      dispatchMessage({
        type: "SET_MESSAGE",
        msg: { variant: "error", text: oidc?.auth?.error },
      })
    }
    dispatch({ type: "SET_OIDC", oidc: oidc })
    dispatch({ type: "SET_ENDPOINT", endpoint: props.endpoint })
    dispatch({ type: "SET_DISABLED_CAS", cas: props.disabledcas })
    dispatch({
      type: "SET_DOCUMENTATION_LINKS",
      links: props.documentationlinks,
    })
  }, [oidc])

  const queryClient = new QueryClient()

  // the router is being used just to make easy use of the url parameters
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContent />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const StyledApp = (props) => {
  return (
    <StyleProvider
      stylesWrapper="shadowRoot"
      theme={`${props.theme ? props.theme : "theme-dark"}`}
    >
      <style>{styles.toString()}</style>
      <StateProvider reducers={reducers}>
        <MessagesStateProvider>
          <App {...props} />
        </MessagesStateProvider>
      </StateProvider>
    </StyleProvider>
  )
}

export default StyledApp
