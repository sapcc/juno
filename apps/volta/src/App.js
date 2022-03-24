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
import { MessagesStateProvider } from "./components/MessagesProvider"

const URL_STATE_KEY = "volta"

const App = (props) => {
  const dispatch = useDispatch()

  const { auth, loggedIn, logout } = useOidcAuth({
    issuerURL: props.issuerurl,
    clientID: props.clientid,
    initialLogin: true,
  })

  useEffect(() => {
    if (!auth) return ""
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
        <IntroBox variant="hero" heroImage="bg-[url('img/app_bg_example.svg')]">
          Secure storage and management of single sign-on certificates
          <div>
            <small>
              <a
                href="https://github.wdf.sap.corp/cc/volta/blob/master/docs/api-v1.md"
                target="_blank"
              >
                Read more about Volta service in our documentation
              </a>
            </small>
          </div>
        </IntroBox>
        <NewCertificate />
        <MessagesStateProvider>
          <Messages />
          <CertificateList />
        </MessagesStateProvider>
      </AppShell>
    </QueryClientProvider>
  )
}

export default (props) => (
  <StateProvider reducers={reducers}>
    <App {...props} />
  </StateProvider>
)
