import React from "react"
import { PortalProvider } from "."

export default {
  title: "Layout/PortalProvider",
  component: PortalProvider,
  argTypes: {},
}

const Template = (args) => (
  <PortalProvider {...args}>{args.children}</PortalProvider>
)

/** The PortalProvider is the parent for all portals of a Juno app. */
export const Default = Template.bind({})
Default.args = {}


