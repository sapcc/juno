import React from "react"
import { SideNavigation } from "./index.js"
import { SideNavigationItem } from "../SideNavigationItem/SideNavigationItem.component"
import { Default as SideNavigationItemStory } from "../SideNavigationItem/SideNavigationItem.stories"

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

const Template = ({items, ...args}) => (
  <SideNavigation {...args}> 
    {items.map((item, i) => (
      <SideNavigationItem key={i} {...item} />
    ))}
  </SideNavigation>
)

export const Default = Template.bind({})
Default.args = {
  items: [
    {...SideNavigationItemStory.args},
    {...SideNavigationItemStory.args},
    {...SideNavigationItemStory.args, icon: "warning"},
    {...SideNavigationItemStory.args, active: true},
  ]
}
