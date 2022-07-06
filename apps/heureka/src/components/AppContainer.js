import React from "react"
import { Tabs, TabList, Tab, TabPanel, Icon } from "juno-ui-components"
import { useNavigate } from "react-router-dom"

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
        {component}
      </Tabs>
    </>
  )
}

export default AppContainer
