import React from "react"
import { Tabs } from "./index.js"
import { Tab } from "../Tab/index.js"
import { Default as DefaultTabStory } from "../Tab/Tab.stories.js"
import { TabList } from "../TabList/index.js"
import { Default as DefaultTabListStory } from "../TabList/TabList.stories.js"
import { TabPanel } from "../TabPanel/index.js"
import { Default as DefaultTabPanelStory } from "../TabPanel/TabPanel.stories.js"


export default {
  title: "Layout/Tabs/Tabs",
  component: Tabs,
  argTypes: {
    variant: {
      options: ["content", "main"],
      control: {
        type: "radio",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Tabs are used to provide a tabbed section within the content area when combining static content and tabbed content on the same page. You will probably want to use a 'Container' (px=false) inside the TabPanels to get nice padding.",
      },
    },
  },
}

const Template = ({tabs, tabpanels, ...args}) => (
  <Tabs {...args} >
    <TabList>
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

export const TabsWithIcons = Template.bind({})
TabsWithIcons.args = {
  tabs: [
    { ...DefaultTabStory.args, children: "Warning", icon: "warning"},
    { ...DefaultTabStory.args, children: "Danger", icon: "danger"},
    { ...DefaultTabStory.args, children: "Info", icon: "info"},
  ],
  tabpanels: [
    { ...DefaultTabPanelStory.args, children: "Warning content" },
    { ...DefaultTabPanelStory.args, children: "Danger content" },
    { ...DefaultTabPanelStory.args, children: "Info content" },
  ],
}

export const ControlledTabs = Template.bind({})
ControlledTabs.args = {
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