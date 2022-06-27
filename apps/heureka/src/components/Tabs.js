import React from "react"
import { Tabs as JunoTabs, TabList, Tab, TabPanel } from "juno-ui-components"
import { Link } from "react-router-dom"
import ServicesList from "./ServicesList"
import ComponentsList from "./ComponentsList"
import ServiceDetail from "./ServiceDetail"

const panelContainer = `
py-4
`

const matchParams = (props) => {
  return (props.match && props.match.params) || {}
}

const Tabs = ({ tabIndex, match }) => {
  tabIndex = React.useMemo(() => {
    return tabIndex || 0
  }, [tabIndex])

  console.log("tabIndex: ", tabIndex)
  console.log("match: ", match)

  return (
    <JunoTabs selectedIndex={tabIndex}>
      <TabList variant="content">
        <Tab>
          <Link to="/services">Services</Link>
        </Tab>
        <Tab>
          <Link to="/components">Components</Link>
        </Tab>
      </TabList>
      <TabPanel className={panelContainer}>
        <ServicesList />
        {/* {entityId ? <ServiceDetail /> : <ServicesList />} */}
      </TabPanel>
      <TabPanel className={panelContainer}>
        <ComponentsList />
      </TabPanel>
    </JunoTabs>
  )
}

export default Tabs
