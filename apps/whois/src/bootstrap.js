import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import styles from "./styles.scss"
import { AppShellProvider } from "juno-ui-components"

export const init = (wrapper, props) => {
  ReactDOM.render(
    <AppShellProvider>
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <App {...props} />
    </AppShellProvider>,
    wrapper
  )
}
