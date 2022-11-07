import React from "react"
import {
  AppShell,
  Container,
  PageHeader,
  TopNavigation,
  TopNavigationItem,
} from "juno-ui-components"
import Messages from "./Messages"
import { useGlobalState } from "./StateProvider"
import HeaderUser from "./HeaderUser"
import { useNavigate } from "react-router-dom"

const CustomAppShell = ({ children }) => {
  const oidc = useGlobalState().auth.oidc
  const navigate = useNavigate()

  const pageHeader = React.useMemo(() => {
    return (
      <PageHeader heading="Converged Cloud | Volta">
        {oidc?.loggedIn && (
          <HeaderUser auth={oidc?.auth} logout={oidc?.logout} />
        )}
      </PageHeader>
    )
  }, [oidc])

  const topBar = (
    <TopNavigation>
      <TopNavigationItem
        icon="home"
        label="Home"
        onClick={() => {
          navigate("/")
        }}
      />
    </TopNavigation>
  )

  return (
    <AppShell pageHeader={pageHeader} topNavigation={topBar}>
      <Container>
        <Messages />
        {children}
      </Container>
    </AppShell>
  )
}

export default CustomAppShell
