import React from "react"
import {
  AppShell,
  Container,
  PageHeader,
  TopNavigation,
  TopNavigationItem,
} from "juno-ui-components"
import Messages from "./Messages"
import { useGlobalState, useDispatch } from "./StateProvider"
import HeaderUser from "./HeaderUser"
import { useNavigate } from "react-router-dom"

const CustomAppShell = ({ children }) => {
  const dispatch = useDispatch()
  const oidc = useGlobalState().auth.oidc
  const navigate = useNavigate()

  const backToRootPath = () => {
    dispatch({ type: "SHOW_NEW_SSO", show: false })
    navigate("/")
  }

  const pageHeader = React.useMemo(() => {
    return (
      <PageHeader heading="Converged Cloud | Volta" onClick={backToRootPath}>
        {oidc?.loggedIn && (
          <HeaderUser auth={oidc?.auth} logout={oidc?.logout} />
        )}
      </PageHeader>
    )
  }, [oidc])

  const topBar = (
    <TopNavigation>
      <TopNavigationItem icon="home" label="Home" onClick={backToRootPath} />
    </TopNavigation>
  )

  return (
    <AppShell pageHeader={pageHeader} topNavigation={topBar}>
      <Container py>
        <Messages />
        {children}
      </Container>
    </AppShell>
  )
}

export default CustomAppShell
