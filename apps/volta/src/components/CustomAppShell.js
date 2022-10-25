import React from "react"
import { AppShell, Container, PageHeader } from "juno-ui-components"
import Messages from "./Messages"
import { useGlobalState } from "./StateProvider"
import HeaderUser from "./HeaderUser"

const CustomAppShell = ({ children }) => {
  const oidc = useGlobalState().auth.oidc

  const pageHeader = React.useMemo(() => {
    return (
      <PageHeader heading="Converged Cloud | Volta">
        {oidc?.loggedIn && (
          <HeaderUser auth={oidc?.auth} logout={oidc?.logout} />
        )}
      </PageHeader>
    )
  }, [oidc])

  return (
    <AppShell pageHeader={pageHeader}>
      <Container>
        <Messages />
        {children}
      </Container>
    </AppShell>
  )
}

export default CustomAppShell
