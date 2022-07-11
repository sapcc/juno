import React from "react"
import {
  MainTabs,
  TabList,
  Tab,
  TabPanel,
  Icon,
  Container,
} from "juno-ui-components"
import { useNavigate } from "react-router-dom"
import Breadcrumb from "./Breadcrumb"
import Messages from "./Messages"

const AppContainer = ({ tabIndex, component }) => {
  let navigate = useNavigate()

  const onTabClicked = (target) => {
    navigate(target)
  }

  return (
    <>
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
    </>
  )
}

export default AppContainer
