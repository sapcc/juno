import React from "react"
import { Tabs as JunoTabs, TabList, Tab, TabPanel } from "juno-ui-components"
import { Link } from "react-router-dom"

const AppContainer = ({ tabIndex, component }) => {
  return (
    <>
      <JunoTabs selectedIndex={tabIndex}>
        <TabList variant="content">
          <Tab>
            <Link to="/services">Services</Link>
          </Tab>
          <Tab>
            <Link to="/components">Components</Link>
          </Tab>
        </TabList>
      </JunoTabs>
      <div className="mt-4">{component}</div>
    </>
  )
}

export default AppContainer
