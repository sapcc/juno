import React, { useEffect, useLayoutEffect } from "react"
import { oidcSession } from "oauth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import styles from "./styles.scss"
import { AppShellProvider } from "juno-ui-components"
import AppContent from "./AppContent"
import { MessagesProvider } from "messages-provider"
import { useGlobalsActions, useAuthActions } from "./hooks/useStore"

const App = (props) => {
  const { setData, setLogin, setLogout } = useAuthActions()
  const { setEndpoint, setDisabledCAs, setDocumentationLinks, setEmbedded } =
    useGlobalsActions()

  // fetch the auth token and save the object globally
  // keep it in the app so the issuerurl and clientid have not to be saved on the state
  const oidc = React.useMemo(() => {=
    if (
      !props?.issuerurl ||
      props?.issuerurl?.length <= 0 ||
      !props?.clientid ||
      props?.clientid?.length <= 0
    )
      return
    return oidcSession({
      issuerURL: props.issuerurl,
      clientID: props.clientid,
      initialLogin: true,
      refresh: true,
      flowType: "code",
      onUpdate: (data) => {
        setData(data)
      },
    })
  }, [setData])

  useEffect(() => {
    if (!oidc?.login || !oidc?.logout) return
    setLogin(oidc.login)
    setLogout(oidc.logout)
  }, [oidc?.login, oidc?.logout])

  // on load application save the props to be used in oder components
  useLayoutEffect(() => {
    if (props.endpoint) setEndpoint(props.endpoint)
    if (props.disabledcas) setDisabledCAs(props.disabledcas)
    if (props.documentationlinks)
      setDocumentationLinks(props.documentationlinks)
    if (props.embedded === "true" || props.embedded === true) setEmbedded(true)
  }, [])

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>
        <AppContent />
      </MessagesProvider>
    </QueryClientProvider>
  )
}

const StyledApp = (props) => {
  return (
    <AppShellProvider theme={`${props.theme ? props.theme : "theme-dark"}`}>
      <style>{styles.toString()}</style>
      <App {...props} />
    </AppShellProvider>
  )
}

export default StyledApp
