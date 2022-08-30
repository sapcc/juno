import React from "react"
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

const AppContainer = ({ tabIndex, test, component }) => {
  const { navigateTo } = useRouter()

  const onTabClicked = (target) => {
    navigateTo(target)
  }

  return (
    <MainTabs selectedIndex={tabIndex}>
      <TabList>
        <Tab onClick={() => onTabClicked("/services")}>
          <Icon className="mr-2" icon="dns" />
          Services
        </Tab>
        <Tab onClick={() => onTabClicked("/components")}>
          <Icon className="mr-2" icon="widgets" />
          Components
        </Tab>
      </TabList>
      <TabPanel />
      <TabPanel />
      <Container>
        <Breadcrumb />
        <Messages />
        {component}
      </Container>
    </MainTabs>
  )
}

export default AppContainer
