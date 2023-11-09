import React from 'react';
import { TabList } from './index.js';
import { Tab } from '../Tab/index.js';
import { Default as DefaultTabStory } from '../Tab/Tab.stories.js';

export default {
  title: 'Layout/Tabs/TabList',
  component: TabList,
  argTypes: {
    children: {
      control: false,
    },
    tabs: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = ({ tabs, ...args }) => (
  <TabList {...args}>
    {tabs.map((tab, i) => (
      <Tab label={`Tab ${i}`} key={`tab-${i}`} disabled={tab.disabled} {...tab} />
    ))}
  </TabList>
);

export const Default = {
  render: Template,

  parameters: {},

  args: {
    tabs: [
      { ...DefaultTabStory.args },
      { ...DefaultTabStory.args },
      { ...DefaultTabStory.args },
      { ...DefaultTabStory.args, disabled: true },
    ],
  },
};

export const MainTabList = {
  render: Template,

  args: {
    variant: 'main',
    tabs: [
      { ...DefaultTabStory.args },
      { ...DefaultTabStory.args },
      { ...DefaultTabStory.args },
      { ...DefaultTabStory.args, disabled: true },
    ],
  },
};
