import React, { useMemo } from "react"
import {
  MainTabs,
  TabList,
  Tab,
  TabPanel,
  Icon,
  Container,
} from "juno-ui-components"
import { useRouter } from "url-state-router"
import Breadcrumb from "./Breadcrumb"
import Messages from "./Messages"
import useStore from "../hooks/useStore"
import WelcomeView from "./WelcomeView"

const AppContainer = ({ tabsConfig, component, children }) => {
  const { navigateTo, currentPath } = useRouter()
  const auth = useStore((state) => state.auth)
  const loggedIn = useStore((state) => state.loggedIn)
  const login = useStore((state) => state.login)

  const tabIndex = useMemo(() => {
    if (!currentPath) return 0
    return tabsConfig.findIndex((tab) => currentPath.startsWith(tab.path))
  }, [currentPath])

  return (
    <>
      {auth?.error || !loggedIn ? (
        <>
          <Messages />
          <WelcomeView loginCallback={login} />
        </>
      ) : (
        <>
          <MainTabs selectedIndex={tabIndex}>
            <TabList>
              {tabsConfig.map((tab, index) => (
                <Tab key={index} onClick={() => navigateTo(tab.path)}>
                  <Icon className="mr-2" icon={tab.icon} />
                  {tab.label}
                </Tab>
              ))}
            </TabList>
            {tabsConfig.map((tab, index) => (
              <TabPanel key={index} />
            ))}
            <Container>
              <Breadcrumb />
              <Messages />
              {component || children}
            </Container>
          </MainTabs>
        </>
      )}
    </>
  )
}

export default AppContainer
