import React from "react"
import { AppShell, Container, PageHeader } from "juno-ui-components"
// import { Messages } from "messages-provider"
import HeaderUser from "./auth/HeaderUser"

const CustomAppShell = ({ embedded, children }) => {
  return (
    <AppShell
      pageHeader={
        <PageHeader heading="Converged Cloud | Example App">
          <HeaderUser />
        </PageHeader>
      }
      embedded={embedded}
    >
      <Container py>
        {/* <Messages className="mb-6" /> */}
        {children}
      </Container>
    </AppShell>
  )
}

export default CustomAppShell
