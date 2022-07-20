import React from "react"
import { Tab } from "./index.js"
import { Icon } from "../Icon/index.js"

export default {
  title: "Layout/Tabs/Tab",
  component: Tab,
  argTypes: {},
}

const Template = (args) => <Tab {...args} /> 

export const Default = Template.bind({})
Default.args = {
  label: "A Tab Label",
  children: "Tab 1"
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  children: "Tab with Icon",
  icon: "danger",
}