import React from "react"
import { TopNavigation } from "./index.js"
import { TopNavigationItem } from "../TopNavigationItem/TopNavigationItem.component"
import { Default as TopNavigationItemStory } from "../TopNavigationItem/TopNavigationItem.stories"

export default {
  title: "WiP/TopNavigation/TopNavigation",
  component: TopNavigation,
  argTypes: {},
}

const Template = ({items, ...args}) => (
  <TopNavigation {...args}> 
    {items.map((item, i) => (
      <TopNavigationItem key={i} {...item} />
    ))}
  </TopNavigation>
)

export const Default = Template.bind({})
Default.args = {
  items: [
    {...TopNavigationItemStory.args},
    {...TopNavigationItemStory.args},
    {...TopNavigationItemStory.args, icon: "warning"},
    {...TopNavigationItemStory.args, active: true},
  ]
}