import React, { useCallback } from "react"
import {
  AppShell,
  Container,
  PageHeader,
  TopNavigation,
  TopNavigationItem,
} from "juno-ui-components"
import { Messages } from "messages-provider"
import useStore from "../store"
import { useNavigate } from "react-router-dom"
import HeaderUser from "./HeaderUser"

const CustomAppShell = ({ children }) => {
  const setShowNewSSO = useStore(useCallback((state) => state.setShowNewSSO))
  const oidc = useStore(useCallback((state) => state.oidc))
  const navigate = useNavigate()

  const backToRootPath = () => {
    setShowNewSSO(false)
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
        <Messages className="mb-6" />
        {children}
      </Container>
    </AppShell>
  )
}

export default CustomAppShell
