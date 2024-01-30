import React from "react"
import { Container, TabNavigation, TabNavigationItem } from "juno-ui-components"
import ServicesController from "../services/ServicesController"
import VulnerabilitiesController from "../vulnerabilities/VulnerabilitiesController"
import TabPanel from "./TabPanel"
import { useActions } from "../StoreProvider"

const TabContext = () => {
  const { setTabIndex } = useActions()

  return (
    <>
      <TabNavigation
        activeItem={"0"}
        onActiveItemChange={(value) => setTabIndex(value)}
      >
        <TabNavigationItem icon="dns" label="Services" value="0" />
        <TabNavigationItem
          icon="autoAwesomeMotion"
          label="Vulnerabilities"
          value="1"
        />
      </TabNavigation>
      <Container py>
        <TabPanel value="0">
          <ServicesController />
        </TabPanel>
        <TabPanel value="1">
          <VulnerabilitiesController />
        </TabPanel>
      </Container>
    </>
  )
}

export default TabContext
