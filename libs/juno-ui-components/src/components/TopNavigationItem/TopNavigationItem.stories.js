import React from "react"
import { TopNavigationItem } from "./index.js"

export default {
  title: "WiP/TopNavigation/TopNavigationItem",
  component: TopNavigationItem,
  argTypes: {},
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