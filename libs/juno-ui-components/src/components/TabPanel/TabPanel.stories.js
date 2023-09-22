import React from "react"
import { TabPanel } from "./index.js"

export default {
  title: "Layout/Tabs/TabPanel",
  component: TabPanel,
  argTypes: {
    children: {
      control: false
    },
  },
}

const Template = (args) => <TabPanel { ...args } />

export const Default = Template.bind({})
Default.args = {
  children: "Tab panel content goes here."
}