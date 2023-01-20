import React, { useState } from "react"
import {
  Container,
  SideNavigation,
  SideNavigationItem,
  Stack,
} from "juno-ui-components"
import DocumentationGeneral from "./DocumentationGeneral"
import DocumentationWidgetLoader from "./DocumentationWidgetLoader"

const Documentation = ({ globals }) => {
  const [sideNavItem, setSideNavItem] = useState("")

  return (
    <Stack alignmet="start" gap="5">
      <SideNavigation
        items={[{ label: "About" }, { label: "Widget Loader" }]}
      />
      <Container>
        <DocumentationGeneral />
      </Container>
    </Stack>
  )
}

export default Documentation
