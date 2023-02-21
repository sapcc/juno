import React, { useEffect } from "react"
import { useOidcAuth } from "oauth"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import styles from "./styles.scss"
import StyleProvider from "juno-ui-components"
import AppContent from "./AppContent"
import { MessagesProvider } from "messages-provider"
import useStore from "./store"

const App = (props) => {
  const setEndpoint = useStore((state) => state.setEndpoint)
  const setOidc = useStore((state) => state.setOidc)
  const setDocumentationLinks = useStore((state) => state.setDocumentationLinks)
  const setDisabledCAs = useStore((state) => state.setDisabledCAs)

  // fetch the auth token and save the object globally
  // keep it in the app so the issuerurl and clientid have not to be saved on the state
  const oidc = useOidcAuth({
    issuerURL: props.issuerurl,
    clientID: props.clientid,
    initialLogin: true,
  })

  // on load application save the props to be used in oder components
  useEffect(() => {
    setOidc(oidc)
    if (props.endpoint) setEndpoint(props.endpoint)
    if (props.disabledcas) setDisabledCAs(props.disabledcas)
    if (props.documentationlinks)
      setDocumentationLinks(props.documentationlinks)
  }, [oidc])

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>
        {/* the router is being used just to make easy use of the url parameters */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppContent />} />
          </Routes>
        </BrowserRouter>
      </MessagesProvider>
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
      <App {...props} />
    </StyleProvider>
  )
}

export default StyledApp
