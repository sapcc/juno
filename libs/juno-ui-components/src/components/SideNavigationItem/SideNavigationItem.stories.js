import React from "react"
import { SideNavigationItem } from "./index.js"

export default {
  title: "Layout/SideNavigation/SideNavigationItem",
  component: SideNavigationItem,
  argTypes: {
    children: {
      control: false
    },
  },
  parameters: { actions: { argTypesRegex: null } }
}

const Template = (args) => <SideNavigationItem {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "Navigation Item"
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  label: "Navigation Item With Icon",
  icon: "warning"
}

export const AsAnchor = Template.bind({})
AsAnchor.args = {
  label: "Navigation Item as Anchor",
  href: "#"
}

export const AsButton = Template.bind({})
AsButton.args = {
  label: "Navigation Item as Button",
  onClick: () => {console.log("clicked")}
}

export const Active = Template.bind({})
Active.args = {
  label: "Active Navigation Item",
  active: true
}