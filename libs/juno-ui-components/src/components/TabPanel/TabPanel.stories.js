import React from "react"
import { TabPanel } from "./index.js"

export default {
  title: "WiP/Tabs/TabPanel",
  component: TabPanel,
  argTypes: {},
}

const Template = (args) => <TabPanel { ...args } />

export const Default = Template.bind({})
Default.args = {
  children: "Tab panel content goes here."
}