import React from "react"
import { Menu } from "./index.js"
import { MenuItem } from "../MenuItem/index.js"
import { Default as MenuItemDefaultStory } from "../MenuItem/MenuItem.stories.js"

export default {
  title: "WiP/Menu",
  component: Menu,
  argTypes: {},
}

const Template = ( {items, ...args} ) => (
  <Menu { ...args } >
    {items.map((item, i) => (
      <MenuItem { ...item } key={ i } />
    ))}
  </Menu>
)

export const Default = Template.bind({})
Default.args = {
  items: [
    { ...MenuItemDefaultStory.args }, 
    { ...MenuItemDefaultStory.args }, 
    { ...MenuItemDefaultStory.args }, 
  ]
}