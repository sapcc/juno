import React from "react"

import { AppShell, Container, Stack } from "juno-ui-components"
import styles from "./styles.scss"
import StyleProvider from "juno-ui-components"

/* IMPORTANT: Replace this with your app's name */
const URL_STATE_KEY = "maintenance"
/* --------------------------- */

const App = (props) => {
  const { embedded, service } = props

  return (
    <AppShell
      pageHeader="Converged Cloud"
      contentHeading="Maintenance announcement"
    >
      <Container>
        <Stack
          direction="vertical"
          alignment="center"
          distribution="center"
          className="h-full bg-[url('img/maintenance.svg')] bg-no-repeat bg-right-bottom"
        >
          <h1 className="text-3xl">{service || "We"} will be right back!</h1>
          <h3 className="text-xl">
            We are currently undergoing a scheduled maintenance
          </h3>
          <h3 className="text-xl">This should only take a few minutes...</h3>
        </Stack>
      </Container>
    </AppShell>
  )
}
const StyledApp = (props) => {
  return (
    <StyleProvider
      stylesWrapper="shadowRoot"
      theme={`${props.theme ? props.theme : "theme-dark"}`}
    >
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <App {...props} />
    </StyleProvider>
  )
}

export default StyledApp
