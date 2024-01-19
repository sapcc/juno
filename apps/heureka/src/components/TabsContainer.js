import React, { useMemo } from "react"
import { Container, TabNavigation, TabNavigationItem } from "juno-ui-components"
import { useRouter } from "url-state-router"
import { Messages } from "messages-provider"

const TabsContainer = ({ tabsConfig, component, children }) => {
  const { navigateTo, currentPath } = useRouter()

  const tabIndex = useMemo(() => {
    if (!currentPath) return 0
    return tabsConfig.findIndex((tab) => currentPath.startsWith(tab.path))
  }, [currentPath])

  const onActiveItemChange = (label) => {
    const i = tabsConfig.findIndex((tab) => label === tab.label)
    navigateTo(tabsConfig[i].path)
  }

  return (
    <>
      <TabNavigation
        activeItem={tabsConfig[tabIndex]?.label}
        onActiveItemChange={onActiveItemChange}
      >
        {tabsConfig.map((tab, index) => (
          <TabNavigationItem key={index} icon={tab.icon} label={tab.label} />
        ))}
      </TabNavigation>

      <Container py>
        <Messages className="mb-4" />
        {component || children}
      </Container>
    </>
  )
}

export default TabsContainer
