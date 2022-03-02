import React, { useEffect, useState } from "react"
import {
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
  Panel,
  PanelBody,
  PanelFooter,
} from "juno-ui-components"
import ContentAreaHeadingStories from "../../../libs/juno-ui-components/src/components/ContentAreaHeading/ContentAreaHeading.stories"

import { useOidcAuth } from "oauth"
import { currentState, push } from "url-state-provider"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query"
import CertificateList from "./components/CertificateList"
import NewCertificate from "./components/NewCertificate"
import Messages from "./components/Messages"
import { StateProvider, useDispatch } from "./components/StateProvider"
import reducers from "./reducers"
import HeaderUser from "./components/HeaderUser"
import { MessagesStateProvider } from "./components/MessagesProvider"
import Toolbar from "./components/Toolbar"

/* Replace this with your app's name */
const URL_STATE_KEY = "volta"

const App = (props) => {
  const dispatch = useDispatch()

  const { auth, logout } = useOidcAuth({
    issuerURL: props.issuerURL,
    clientID: props.clientID,
    initialLogin: true,
  })

  useEffect(() => {
    if (!auth) return ""
    console.log("auth changed: ", auth)
    console.log("auth id: ", auth.id_token)
    dispatch({ type: "SET_AUTH", auth })
  }, [auth])

  // Create a client
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AppBody>
        <PageHeader heading="Converged Cloud | Volta">
          {auth && <HeaderUser name={auth.full_name} logout={logout} />}
        </PageHeader>

        {/* Wrap everything except page header and footer in a main container */}
        <MainContainer>
          {/* Exchange image with app specific image (save in src/img/). If you don't have a background graphic for your app just remove the whole className prop */}
          <ContentContainer className="bg-[url('img/app_bg.svg')]">
            {/* App intro text */}
            <AppIntro>
              Volta UI manages your SSO certificates stored in a Vault instance.
            </AppIntro>

            <ContentAreaHeading heading="SSO Certificates" />
            <ContentAreaWrapper>
              <Toolbar />
              <NewCertificate />
              <ContentArea className="mt-0">
                <MessagesStateProvider>
                  <Messages />

                  <CertificateList />
                </MessagesStateProvider>
              </ContentArea>
            </ContentAreaWrapper>
          </ContentContainer>
        </MainContainer>

        <PageFooter />
      </AppBody>
    </QueryClientProvider>
  )
}

export default (props) => (
  <StateProvider reducers={reducers}>
    <App {...props} />
  </StateProvider>
)
