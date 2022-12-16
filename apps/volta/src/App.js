import React, { useEffect } from "react"
import { useOidcAuth } from "oauth"
import { QueryClient, QueryClientProvider } from "react-query"
import { StateProvider, useDispatch } from "./components/StateProvider"
import reducers from "./reducers"
import CA from "./components/CA"
import WellcomeView from "./components/WellcomeView"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import styles from "./styles.scss"
import StyleProvider from "juno-ui-components"
import { MessagesProvider, useMessageStore } from "messages-provider"

const App = (props) => {
  const dispatch = useDispatch()
  const setMessage = useMessageStore((state) => state.setMessage)

  const oidc = useOidcAuth({
    issuerURL: props.issuerurl,
    clientID: props.clientid,
    initialLogin: true,
  })

  useEffect(() => {
    if (oidc?.auth?.error) {
      setMessage("error", oidc?.auth?.error)
    }
    dispatch({ type: "SET_OIDC", oidc: oidc })
    dispatch({ type: "SET_ENDPOINT", endpoint: props.endpoint })
  }, [oidc])

  // Create a client
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              oidc?.loggedIn ? (
                <CA />
              ) : (
                <WellcomeView loginCallback={oidc?.login} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const StyledApp = (props) => {
  // default props
  props = {
    issuerurl: process.env.OIDC_ISSUER_URL,
    clientid: process.env.OIDC_CLIENTID,
    endpoint: process.env.ENDPOINT,
    ...props,
  }

  return (
    <StyleProvider
      stylesWrapper="shadowRoot"
      theme={`${props.theme ? props.theme : "theme-dark"}`}
    >
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <StateProvider reducers={reducers}>
        <MessagesProvider>
          <App {...props} />
        </MessagesProvider>
      </StateProvider>
    </StyleProvider>
  )
}

export default StyledApp
