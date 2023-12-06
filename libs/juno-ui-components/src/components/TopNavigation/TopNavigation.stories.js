import React from "react"
import { TopNavigation } from "./index.js"
import { TopNavigationItem } from "../TopNavigationItem/TopNavigationItem.component"

export default {
  title: "Navigation/TopNavigation/TopNavigation",
  component: TopNavigation,
  argTypes: {
    items: {
      table: {
        disable: true
      }
    },
    children: {
      control: false
    },
  }
}

const Template = ({children, ...args}) => (
  <TopNavigation {...args}> 
    { children }
  </TopNavigation>
)

export const Default = Template.bind({})
Default.args = {
  children: [
    <TopNavigationItem label="Item 1" key="item-1" />,
    <TopNavigationItem label="Item 2" key="item-2" active />,
    <TopNavigationItem label="Item with Icon" key="item-3" icon="warning" />,
    <TopNavigationItem label="Disabled Item" key="item-4" disabled />
  ]
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  children: 
    [
      <TopNavigationItem label="Item 1" key="item-1" />,
      <TopNavigationItem label="Item 2" key="item-2" />,
      <TopNavigationItem label="Item 3" key="item-3" />,
      <TopNavigationItem label="Item 4" key="item-4" />
    ]
}