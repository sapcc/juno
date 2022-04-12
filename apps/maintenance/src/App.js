import React from "react"

import { AppShell, Stack } from "juno-ui-components"
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
      <Stack direction="vertical" alignment="center" distribution="center" className="h-1/3">
        <h1 className="text-3xl">{service || "We"} will be right back!</h1>
        <h3 className="text-xl">We are currently undergoing a scheduled maintenance...</h3>
      </Stack>
    </AppShell>
  )
}

export default App
