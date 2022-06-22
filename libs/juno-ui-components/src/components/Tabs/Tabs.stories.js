import React from "react"
import { Tabs } from "./index.js"
import { Tab } from "../Tab/index.js"
import { Default as DefaultTabStory } from "../Tab/Tab.stories.js"
import { TabList } from "../TabList/index.js"
import { Default as DefaultTabListStory } from "../TabList/TabList.stories.js"
import { TabPanel } from "../TabPanel/index.js"
import { Default as DefaultTabPanelStory } from "../TabPanel/TabPanel.stories.js"


export default {
  title: "WiP/Tabs/Tabs",
  component: Tabs,
  argTypes: {
    variant: {
      control: {
        type: "radio",
        options: ["content", "top"],
      },
    },
  },
}

const Template = ({variant, tabs, tabpanels, ...args}) => (
  <Tabs {...args} >
    <TabList variant={variant}>
      {tabs.map((tab, t) => (
        <Tab {...tab} key={`t-${t}`} ></Tab>
      ))}
    </TabList>
    {tabpanels.map((tabpanel, p) => (
      <TabPanel {...tabpanel} key={`p-${p}`} ></TabPanel>
    ))}
  </Tabs>
  )

export const Default = Template.bind({})
Default.args = {
  variant: null,
  tabs: [
    { ...DefaultTabStory.args, children: "Tab 1"},
    { ...DefaultTabStory.args, children: "Tab 2"},
    { ...DefaultTabStory.args, children: "Tab 3"},
  ],
  tabpanels: [
    { ...DefaultTabPanelStory.args, children: "Tab 1 panel content" },
    { ...DefaultTabPanelStory.args, children: "Tab 2 panel content" },
    { ...DefaultTabPanelStory.args, children: "Tab 3 panel content" },
  ],
}

export const ContentTabs = Template.bind({})
ContentTabs.args = {
  variant: "content",
  tabs: [
    { ...DefaultTabStory.args, children: "Tab 1"},
    { ...DefaultTabStory.args, children: "Tab 2"},
    { ...DefaultTabStory.args, children: "Tab 3"},
  ],
  tabpanels: [
    { ...DefaultTabPanelStory.args, children: "Tab 1 panel content" },
    { ...DefaultTabPanelStory.args, children: "Tab 2 panel content" },
    { ...DefaultTabPanelStory.args, children: "Tab 3 panel content" },
  ],
}

export const ControlledTabs = Template.bind({})
ControlledTabs.args = {
  variant: null,
  tabs: [
    { ...DefaultTabStory.args, children: "Controlled Tab 1"},
    { ...DefaultTabStory.args, children: "Controlled Tab 2"},
    { ...DefaultTabStory.args, children: "Controlled Tab 3"},
  ],
  tabpanels: [
    { ...DefaultTabPanelStory.args, children: "Tab 1 panel content" },
    { ...DefaultTabPanelStory.args, children: "Tab 2 panel content" },
    { ...DefaultTabPanelStory.args, children: "Tab 3 panel content" },
  ],
  selectedIndex: 1,
  defaultIndex: null,
}