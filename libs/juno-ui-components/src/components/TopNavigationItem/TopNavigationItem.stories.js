import React from "react"
import { TopNavigationItem } from "./index.js"

export default {
  title: "Layout/TopNavigation/TopNavigationItem",
  component: TopNavigationItem,
  argTypes: {
    children: {
      control: false
    },
  },
  parameters: { actions: { argTypesRegex: null } }
}

const Template = (args) => <TopNavigationItem {...args} />

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