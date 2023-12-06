import React from "react"
import { SideNavigation } from "./index.js"
import { SideNavigationItem } from "../SideNavigationItem/SideNavigationItem.component"


export default {
  title: "Navigation/SideNavigation/SideNavigation",
  component: SideNavigation,
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

const Template = ( {children, ...args} ) => (
  <SideNavigation {...args}> 
   { children }
  </SideNavigation>
)

export const Default = Template.bind({})
Default.args = {
  children: [
    <SideNavigationItem key="item-1" label="Item 1"/>,
    <SideNavigationItem key="item-2" label="Item 2" active/>,
    <SideNavigationItem key="item-3" label="Item with Icon"/>,
    <SideNavigationItem key="item-4" label="Disabled Item" disabled/>,
  ]
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  children: [
    <SideNavigationItem key="item-1" label="Item 1"/>,
    <SideNavigationItem key="item-2" label="Item 2"/>,
    <SideNavigationItem key="item-3" label="Active Item" active/>
  ]
}
