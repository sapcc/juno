import React, { useEffect, useState } from "react"
import { AppShell, IntroBox, PageHeader } from "juno-ui-components"

import { useOidcAuth } from "oauth"
import { QueryClient, QueryClientProvider } from "react-query"
import CertificateList from "./components/CertificateList"
import NewCertificate from "./components/NewCertificate"
import Messages from "./components/Messages"
import { StateProvider, useDispatch } from "./components/StateProvider"
import reducers from "./reducers"
import HeaderUser from "./components/HeaderUser"
import CustomIntroBox from "./components/CustomIntroBox"
import {
  MessagesStateProvider,
  useMessagesDispatch,
} from "./components/MessagesProvider"

const URL_STATE_KEY = "volta"

const App = (props) => {
  const dispatch = useDispatch()
  const dispatchMessage = useMessagesDispatch()

  const { auth, loggedIn, logout } = useOidcAuth({
    issuerURL: props.issuerurl,
    clientID: props.clientid,
    initialLogin: true,
  })

  useEffect(() => {
    if (!auth) return null
    if (auth?.error) {
      dispatchMessage({
        type: "SET_MESSAGE",
        msg: { variant: "error", text: auth?.error },
      })
    }
    dispatch({ type: "SET_AUTH", auth })
    dispatch({ type: "SET_ENDPOINT", endpoint: props.endpoint })
  }, [auth])

  // Create a client
  const queryClient = new QueryClient()

  const customPageHeader = React.useMemo(() => {
    return (
      <PageHeader heading="Converged Cloud | Volta">
        {loggedIn && <HeaderUser name={auth?.full_name} logout={logout} />}
      </PageHeader>
    )
  }, [loggedIn, logout, auth])

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell pageHeader={customPageHeader} contentHeading="SSO Certificates">
        <CustomIntroBox isLoggedIn={loggedIn} />
        <NewCertificate />
        <Messages />
        {loggedIn && <CertificateList />}
      </AppShell>
    </QueryClientProvider>
  )
}

export default (props) => (
  <StateProvider reducers={reducers}>
    <MessagesStateProvider>
      <App {...props} />
    </MessagesStateProvider>
  </StateProvider>
)
