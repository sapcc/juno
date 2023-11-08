import React from "react"
import { SideNavigation } from "./index.js"
import { SideNavigationItem } from "../SideNavigationItem/SideNavigationItem.component"


export default {
  title: "Layout/SideNavigation/SideNavigation",
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
    <SideNavigationItem label="Item 1"/>,
    <SideNavigationItem>Item 2</SideNavigationItem>,
    <SideNavigationItem label="Active Item" active/>
  ]
}
