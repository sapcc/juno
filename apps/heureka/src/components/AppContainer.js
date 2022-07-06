import React from "react"
import {
  Tabs,
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
      <Tabs selectedIndex={tabIndex}>
        <TabList variant="content">
          <Tab onClick={() => onTabClicked("/services")}>
            <Icon className="mr-2" icon="autoAwesomeMosaic" />
            Services
          </Tab>
          <Tab onClick={() => onTabClicked("/components")}>
            <Icon className="mr-2" icon="autoAwesomeMotion" />
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
      </Tabs>
    </>
  )
}

export default AppContainer
