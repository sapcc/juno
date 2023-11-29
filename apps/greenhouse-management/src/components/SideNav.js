import React from "react"

import { SideNavigation, SideNavigationItem } from "juno-ui-components"

const SideNav = () => {
  return (
    <SideNavigation>
      <SideNavigationItem active>
        Clusters
      </SideNavigationItem>
      <SideNavigationItem>
        Plugins
      </SideNavigationItem>
      <SideNavigationItem>
        Teams
      </SideNavigationItem>
    </SideNavigation>
  )
}

export default SideNav
