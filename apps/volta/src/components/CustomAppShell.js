import React, { useCallback } from "react"
import {
  AppShell,
  Container,
  PageHeader,
  TopNavigation,
  TopNavigationItem,
} from "juno-ui-components"
import { Messages } from "messages-provider"
import {
  useAuthData,
  useAuthLogout,
  useSsoActions,
  useAuthLoggedIn,
  useGlobalsActions,
} from "../hooks/useStore"
import HeaderUser from "./HeaderUser"

const CustomAppShell = ({ children }) => {
  const { setShowNewCert } = useSsoActions()
  const authData = useAuthData()
  const loggedIn = useAuthLoggedIn()
  const logout = useAuthLogout()
  const { setSelectedCA } = useGlobalsActions()

  const backToRootPath = () => {
    setShowNewCert(false)
    setSelectedCA("")
  }

  const pageHeader = React.useMemo(() => {
    return (
      <PageHeader heading="Converged Cloud | Volta" onClick={backToRootPath}>
        {loggedIn && <HeaderUser auth={authData} logout={logout} />}
      </PageHeader>
    )
  }, [loggedIn, authData, logout])

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
