import React from "react"
import { SideNavigationItem } from "./index.js"

export default {
  title: "Layout/SideNavigation/SideNavigationItem",
  component: SideNavigationItem,
  argTypes: {},
  parameters: { actions: { argTypesRegex: null } }
}

const Template = (args) => <SideNavigationItem {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "Navigation Item"
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  label: "Navigation Item",
  icon: "warning"
}

export const AsAnchor = Template.bind({})
AsAnchor.args = {
  label: "Navigation Item",
  href: "#"
}

export const AsButton = Template.bind({})
AsButton.args = {
  label: "Navigation Item",
  onClick: () => {console.log("clicked")}
}

export const Active = Template.bind({})
Active.args = {
  label: "Navigation Item",
  active: true
}