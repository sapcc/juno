import React, { useState } from "react"
import {
  Container,
  SideNavigation,
  SideNavigationItem,
  Stack,
} from "juno-ui-components"
import DocumentationGeneral from "./DocumentationGeneral"
import DocumentationWidgetLoader from "./DocumentationWidgetLoader"

const nav = {
  abaut: { label: "About", component: <DocumentationGeneral /> },
  wigetLoader: {
    label: "Widget Loader",
    component: <DocumentationWidgetLoader />,
  },
}

const Documentation = ({ data }) => {
  const [activeNavItem, setActiveNavItem] = useState(null)

  console.log("GLOBALS: ", data)

  const onNavItemClicked = (value) => {
    setActiveNavItem(value)
  }

  return (
    <Stack alignmet="start" gap="5">
      <SideNavigation>
        {Object.keys(nav).map((key, index) => (
          <SideNavigationItem
            key={index}
            active={key === activeNavItem}
            label={nav[key].label}
            onClick={() => onNavItemClicked(key)}
          />
        ))}
      </SideNavigation>
      <Container>{activeNavItem && nav[activeNavItem].component}</Container>
    </Stack>
  )
}

export default Documentation
