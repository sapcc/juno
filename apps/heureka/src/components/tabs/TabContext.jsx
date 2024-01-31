import React, { useMemo } from "react"
import { Container, TabNavigation, TabNavigationItem } from "juno-ui-components"
import TabPanel from "./TabPanel"
import { useActions, useActiveTab } from "../StoreProvider"

import ServicesTab from "../services/ServicesTab"
import VulnerabilitiesController from "../vulnerabilities/VulnerabilitiesController"

const TAB_CONFIG = [
  {
    label: "Services",
    value: "services",
    icon: "dns",
    component: ServicesTab,
  },
  {
    label: "Vulnerabilities",
    value: "vulnerabilities",
    icon: "autoAwesomeMotion",
    component: VulnerabilitiesController,
  },
]

const TabContext = () => {
  const { setActiveTab } = useActions()
  const activeTab = useActiveTab()

  return (
    <>
      <TabNavigation
        activeItem={activeTab}
        onActiveItemChange={(value) => setActiveTab(value)}
      >
        {TAB_CONFIG.map((tab) => (
          <TabNavigationItem
            key={tab.value}
            icon={tab.icon}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </TabNavigation>
      <Container py>
        {TAB_CONFIG.map((tab) => (
          <TabPanel key={tab.value} value={tab.value}>
            <tab.component />
          </TabPanel>
        ))}
      </Container>
    </>
  )
}

export default TabContext
