import React from "react"
import { Tabs as JunoTabs, TabList, Tab, TabPanel } from "juno-ui-components"
import { Link, useNavigate } from "react-router-dom"

const AppContainer = ({ tabIndex, component }) => {
  let navigate = useNavigate()

  const onTabClicked = (target) => {
    navigate(target)
  }

  return (
    <>
      <JunoTabs selectedIndex={tabIndex}>
        <TabList variant="content">
          <Tab onClick={() => onTabClicked("/services")}>Services</Tab>
          <Tab onClick={() => onTabClicked("/components")}>Components</Tab>
        </TabList>
      </JunoTabs>
      <div className="mt-4">{component}</div>
    </>
  )
}

export default AppContainer
