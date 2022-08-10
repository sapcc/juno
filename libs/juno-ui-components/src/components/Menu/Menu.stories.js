import React from "react"
import { Menu } from "./index.js"
import { MenuItem } from "../MenuItem/index.js"
import { MenuSection } from "../MenuSection/index.js"
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

const WithSectionsTemplate = ( {sections, ...args} ) => (
  <Menu { ...args }>
    {sections.map((section, s) => (
      <MenuSection {...section}>
        {section.items.map((item, i) =>(
          <MenuItem {...item} key={i} />
        ))}
      </MenuSection>
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

export const Small = Template.bind({})
Small.args = {
  variant: "small",
  items: [
    { ...MenuItemDefaultStory.args }, 
    { ...MenuItemDefaultStory.args }, 
    { ...MenuItemDefaultStory.args }, 
  ]
}

export const WithSections = WithSectionsTemplate.bind({})
WithSections.args = {
  sections: [
    {
      items: [
        { ...MenuItemDefaultStory.args }, 
        { ...MenuItemDefaultStory.args }, 
        { ...MenuItemDefaultStory.args }, 
      ]
    },
    {
      title: "DangerZone",
      items: [
        { ...MenuItemDefaultStory.args }, 
        { ...MenuItemDefaultStory.args }, 
        { ...MenuItemDefaultStory.args }, 
      ]
    }
  ]
}