import React, { useEffect } from "react"
import { oidcSession } from "oauth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import styles from "./styles.scss"
import { AppShellProvider } from "juno-ui-components"
import AppContent from "./AppContent"
import { MessagesProvider } from "messages-provider"
import useStore from "./store"

const App = (props) => {
  const setEndpoint = useStore((state) => state.setEndpoint)
  const setAuthData = useStore((state) => state.setAuthData)
  const setDocumentationLinks = useStore((state) => state.setDocumentationLinks)
  const setDisabledCAs = useStore((state) => state.setDisabledCAs)
  const setLogin = useStore((state) => state.setLogin)
  const setLogout = useStore((state) => state.setLogout)
  // fetch the auth token and save the object globally
  // keep it in the app so the issuerurl and clientid have not to be saved on the state
  const oidc = React.useMemo(
    () =>
      oidcSession({
        issuerURL: props.issuerurl,
        clientID: props.clientid,
        initialLogin: true,
        refresh: true,
        flowType: "code",
        onUpdate: (authData) => {
          setAuthData(authData)
        },
      }),
    [setAuthData]
  )
  setLogin(oidc.login)
  setLogout(oidc.logout)

  // on load application save the props to be used in oder components
  useEffect(() => {
    if (props.endpoint) setEndpoint(props.endpoint)
    if (props.disabledcas) setDisabledCAs(props.disabledcas)
    if (props.documentationlinks)
      setDocumentationLinks(props.documentationlinks)
  }, [])

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
    <AppShellProvider>
      <style>{styles.toString()}</style>
      <App {...props} />
    </AppShellProvider>
  )
}

export default StyledApp
