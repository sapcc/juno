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
  const authData = useStore(useCallback((state) => state.authData))
  const logout = useStore(useCallback((state) => state.logout))
  const navigate = useNavigate()

  const backToRootPath = () => {
    setShowNewSSO(false)
    navigate("/")
  }

  const pageHeader = React.useMemo(() => {
    return (
      <PageHeader heading="Converged Cloud | Volta" onClick={backToRootPath}>
        {authData?.loggedIn && (
          <HeaderUser auth={authData?.auth} logout={logout} />
        )}
      </PageHeader>
    )
  }, [authData])

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
