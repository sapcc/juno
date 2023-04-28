import React, { useCallback } from "react"
import {
  AppShell,
  Container,
  PageHeader,
  TopNavigation,
  TopNavigationItem,
} from "juno-ui-components"
import { Messages } from "messages-provider"
import { useAuthData, useAuthLogout, useSsoActions } from "../hooks/useStore"
import { useNavigate } from "react-router-dom"
import HeaderUser from "./HeaderUser"

const CustomAppShell = ({ children }) => {
  const { setShowNewSSO } = useSsoActions()
  const authData = useAuthData()
  const logout = useAuthLogout()
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
