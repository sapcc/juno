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

  return (
    <QueryClientProvider client={queryClient}>
      <AppBody>
        <PageHeader heading="Converged Cloud | Volta">
          {loggedIn && <HeaderUser name={auth.full_name} logout={logout} />}
        </PageHeader>

        {/* Wrap everything except page header and footer in a main container */}
        <MainContainer>
          {/* Exchange image with app specific image (save in src/img/). If you don't have a background graphic for your app just remove the whole className prop */}
          <ContentContainer className="bg-[url('img/app_bg_example.svg')]">
            {/* App intro text */}
            <AppIntro>
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
            </AppIntro>

            <ContentAreaHeading heading="SSO Certificates" />
            <ContentAreaWrapper>
              <NewCertificate />
              <ContentArea className="mt-0">
                <Toolbar />

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
