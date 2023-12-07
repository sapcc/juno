import React from 'react'
import { TabNavigation } from './index.js'
import { TabNavigationItem } from '../TabNavigationItem/index.js'

export default {
  title: 'Navigation/TabNavigation/TabNavigation',
  component: TabNavigation,
  argTypes: {
    children: {
      control: false,
    },
    onActiveItemChange: {
      control: false,
    },
    tabStyle: {
      options: ['main', 'content'],
      control: { type: 'radio' },
    },
  },
};

const Template = ({ children, ...args}) => (
  <TabNavigation {...args}>
    { children }
  </TabNavigation>
)

export const Default = Template.bind({})
Default.args = {
  children: [
      <TabNavigationItem label="Item 1" key="item-1"></TabNavigationItem>,
      <TabNavigationItem label="Item 2" key="item-2" active></TabNavigationItem>,
      <TabNavigationItem label="Item with Icon" key="item-3" icon="warning"></TabNavigationItem>,
      <TabNavigationItem label="Disabled Item" key="item-4" disabled></TabNavigationItem>
   ]
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  children: 
    [
      <TabNavigationItem label="Item 1" key="item-1"></TabNavigationItem>,
      <TabNavigationItem label="Item 2" key="item-2"></TabNavigationItem>,
      <TabNavigationItem label="Item 3" key="item-3"></TabNavigationItem>,
      <TabNavigationItem label="Item 4" key="item-4"></TabNavigationItem>
    ]
}