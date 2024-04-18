/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react"

import { AppShell, AppShellProvider } from "juno-ui-components"
import StoreProvider from "./components/StoreProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppContent from "./AppContent"
import styles from "./styles.scss"

/* --------------------------- */

const App = (props = {}) => {
  // Create query client which it can be used from overall in the app
  // set default endpoint to fetch data
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        meta: {
          endpoint: props.endpoint || props.currentHost || "",
        },
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        pageHeader="Converged Cloud | App Template"
        embedded={props.embedded === "true" || props.embedded === true}
      >
        <AppContent props={props} />
      </AppShell>
    </QueryClientProvider>
  )
}

const StyledApp = (props) => {
  return (
    <AppShellProvider theme={`${props.theme ? props.theme : "theme-dark"}`}>
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <StoreProvider>
        <App {...props} />
      </StoreProvider>
    </AppShellProvider>
  )
}

export default StyledApp
