import React from "react"
import { TabList } from "./index.js"
import { Tab } from "../Tab/index.js"
import { Default as DefaultTabStory } from "../Tab/Tab.stories.js"

export default {
  title: "WiP/Tabs/TabList",
  component: TabList,
  argTypes: {},
}

const Template = ({ tabs, ...args }) => (
  <TabList {...args} >
    {tabs.map((tab, i) => (
      <Tab label={`Tab ${i}`} key={`tab-${i}`} disabled={tab.disabled} {...tab} />
    ))}
  </TabList>
)

export const Default = Template.bind({})
Default.parameters = {
  
}
Default.args = {
  tabs: [
    { ...DefaultTabStory.args },
    { ...DefaultTabStory.args },
    { ...DefaultTabStory.args },
    { ...DefaultTabStory.args, disabled: true }
  ]
}