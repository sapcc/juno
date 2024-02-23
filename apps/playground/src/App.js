import React from "react"

import { AppShell, AppShellProvider } from "juno-ui-components"
import StoreProvider from "./components/StoreProvider"
import AppContent from "./AppContent"
import styles from "./styles.scss"
import editorStyles from "@uiw/react-textarea-code-editor/dist.css"

const App = (props = {}) => {
  return (
    <AppShell
      pageHeader="Converged Cloud | Playground"
      embedded={props.embedded === "true" || props.embedded === true}
    >
      <AppContent props={props} />
    </AppShell>
  )
}

const StyledApp = (props) => {
  return (
    <AppShellProvider theme={`${props.theme ? props.theme : "theme-dark"}`}>
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <style>{editorStyles.toString()}</style>
      <StoreProvider>
        <App {...props} />
      </StoreProvider>
    </AppShellProvider>
  )
}

export default StyledApp
