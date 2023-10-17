import React from "react"
import { TopNavigation } from "./index.js"
import { TopNavigationItem } from "../TopNavigationItem/TopNavigationItem.component"

export default {
  title: "Layout/TopNavigation/TopNavigation",
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
    <TopNavigationItem label="Item 1" />,
    <TopNavigationItem>Item 2</TopNavigationItem>,
    <TopNavigationItem icon="warning" label="Item with Icon" />,
    <TopNavigationItem alabel="Active Item" />
  ]
}