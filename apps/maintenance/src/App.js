import React from "react"

import { AppShell, Container, Stack } from "juno-ui-components"
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
        <Stack direction="vertical" alignment="center" distribution="center" className="h-full bg-[url('img/maintenance.svg')] bg-no-repeat bg-right-bottom">
          <h1 className="text-3xl">{service || "We"} will be right back!</h1>
          <h3 className="text-xl">We are currently undergoing a scheduled maintenance</h3>
          <h3 className="text-xl">This should only take a few minutes...</h3>
        </Stack>
      </Container>
    </AppShell>
  )
}

export default App
