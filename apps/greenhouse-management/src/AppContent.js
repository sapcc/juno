import React from "react"
import { AppShell, Container } from "juno-ui-components"


// This is your starting point of tour application
// see several examples in the exampleApp
const AppContent = (props) => {
  return (
    <>
      <AppShell
        pageHeader="Example Management Plugin"
        embedded={true}
      >
        <Container py>
          Example Plugin loaded here. Replace the complete AppShell with the plugin. Be sure to set embedded to true.
        </Container>
      </AppShell>
    </>
  )
}

export default AppContent
