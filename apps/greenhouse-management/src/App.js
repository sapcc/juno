import React from "react"

import {
  AppBody,
  AppShellProvider,
  MainContainer,
  MainContainerInner,
  ContentContainer,
} from "juno-ui-components"
import StoreProvider from "./components/StoreProvider"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppContent from "./AppContent"
import styles from "./styles.scss"
import OrgInfo from "./components/OrgInfo"
import SideNav from "./components/SideNav"
import AsyncWorker from "./components/AsyncWorker"
import { MessagesProvider, Messages } from "messages-provider"
import Auth from "./components/Auth"

const App = (props = {}) => {
  // to be deleted
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        meta: {
          endpoint: props.endpoint || props.currentHost || "",
        },
      },
    },
  })

  // support only embeded mode for now. This will probably never be started standalone
  // page layout is copied from juno-ui-components/src/components/AppShell/AppShell.component.js
  return (
    <QueryClientProvider client={queryClient}>
      <AsyncWorker />
      <AppBody data-testid="greenhouse-management">
        <MessagesProvider>
          <Messages className="mb-4" />
          <Auth>
            <OrgInfo />
            <MainContainer>
              <MainContainerInner fullWidth={true}>
                <SideNav />
                <ContentContainer>
                  <AppContent {...props} />
                </ContentContainer>
              </MainContainerInner>
            </MainContainer>
          </Auth>
        </MessagesProvider>
      </AppBody>
    </QueryClientProvider>
  )
}

const StyledApp = (props) => {
  return (
    <AppShellProvider theme={`${props.theme ? props.theme : "theme-dark"}`}>
      <style>{styles.toString()}</style>
      <StoreProvider options={props}>
        <App {...props} />
      </StoreProvider>
    </AppShellProvider>
  )
}

export default StyledApp
