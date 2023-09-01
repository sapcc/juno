import React from "react"
import { MenuSection } from "./index.js"
import { Menu } from "../Menu/index.js"
import { MenuItem } from "../MenuItem/index.js"
import { Default as MenuItemDefaultStory } from "../MenuItem/MenuItem.stories.js"


export default {
  title: "WiP/Menu/MenuSection",
  component: MenuSection,
  argTypes: {
    items: {
      table: {
        disable: true
      }
    }
  }
}

const Template = ({items, ...args}) => (
  <Menu>
  <MenuSection {...args}>
    {items.map((item, i) => (
      <MenuItem {...item} key={i} />
    ))}
  </MenuSection>
  <MenuSection {...args}>
    {items.map((item, i) => (
      <MenuItem {...item} key={i} />
    ))}
  </MenuSection>
  </Menu>
)

export const Default = Template.bind({})
Default.args = {
	title: "Menu Section",
  items: [
    { ...MenuItemDefaultStory.args },
    { ...MenuItemDefaultStory.args },
    { ...MenuItemDefaultStory.args },
  ]
}