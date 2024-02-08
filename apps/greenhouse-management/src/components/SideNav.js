import React from "react"
import { SideNavigation, SideNavigationItem } from "juno-ui-components"
import { usePluginConfig, usePluginActive, useActions } from "./StoreProvider"

const SideNav = () => {
  const pluginConfig = usePluginConfig()
  const pluginActive = usePluginActive()

  const { setPluginActive } = useActions()

  return (
    <SideNavigation activeItem={pluginActive}>
      {Object.keys(pluginConfig).map((key, index) => (
        <SideNavigationItem
          key={index}
          label={pluginConfig[key]?.label}
          value={pluginConfig[key]?.name}
          onClick={() => setPluginActive(pluginConfig[key]?.name)}
        />
      ))}
    </SideNavigation>
  )
}

export default SideNav
