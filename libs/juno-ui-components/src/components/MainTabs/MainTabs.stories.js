import React from "react"
import { MainTabs } from "./index.js"
import { Tab } from "../Tab/index.js"
import { Default as TabStory } from "../Tab/Tab.stories.js"
import { TabList } from "../TabList/index.js"
import { Default as TabListStory } from "../TabList/TabList.stories.js"
import { TabPanel } from "../TabPanel/index.js"
import { Default as TabPanelStory } from "../TabPanel/TabPanel.stories.js"

export default {
	title: "Layout/Tabs/MainTabs",
	component: MainTabs,
	argTypes: {},
	parameters: {
    docs: {
      description: {
        component:
          "Main Tabs are used at the top of the content area when using the tabs to switch the complete content area content. If you only want to have tabs for parts of the content use 'Tabs' instead and place them in the part of the content where the tabbed content should live. You will probably want to use a 'Container' inside the TabPanels to get nice padding.",
      },
    },
  },
}

const Template = ({tabs, tabpanels, ...args}) => (
	<MainTabs { ...args } >
		<TabList>
			{tabs.map((tab, t) => (
				<Tab {...tab} key={`tab-${t}`}></Tab>
			))}
		</TabList>
		{tabpanels.map((panel, p) => (
			<TabPanel { ...panel } key={`panel-${p}`} ></TabPanel>
		))}
	</MainTabs>
)

export const Default = Template.bind({})
Default.args = {
	tabs: [
		{ ...TabStory.args, children: "MainTab 1" },
		{ ...TabStory.args, children: "MainTab 2" },
		{ ...TabStory.args, children: "MainTab 3" },
	],
	tabpanels: [
		{ ...TabPanelStory.args, children: "MainTab Panel 1" },
		{ ...TabPanelStory.args, children: "MainTab Panel 2" },
		{ ...TabPanelStory.args, children: "MainTab Panel 3" },
	],
}

export const Controlled = Template.bind({})
Controlled.args = {
	tabs: [
		{ ...TabStory.args, children: "Controlled MainTab 1" },
		{ ...TabStory.args, children: "Controlled MainTab 2" },
		{ ...TabStory.args, children: "Controlled MainTab 3" },
	],
	tabpanels: [
		{ ...TabPanelStory.args, children: "Controlled MainTab Panel 1" },
		{ ...TabPanelStory.args, children: "Controlled MainTab Panel 2" },
		{ ...TabPanelStory.args, children: "Controlled MainTab Panel 3" },
	],
	selectedIndex: 1,
	defaultIndex: null,
}

