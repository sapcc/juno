import React from "react"
import { Menu } from "./index.js"
import { MenuItem } from "../MenuItem/index.js"
import { MenuSection } from "../MenuSection/index.js"
import { Default as MenuItemDefaultStory } from "../MenuItem/MenuItem.stories.js"

export default {
  title: "WiP/Menu",
  component: Menu,
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
  <Menu { ...args } >
    { children }
  </Menu>
)

export const Default = Template.bind({})
Default.args = {
  children: [
    <MenuItem label="Label only" />,
    <MenuItem label="Label with Icon" icon="help" />,
    <MenuItem label="Item with a Link" href="https://github.com/sapcc/juno" />,
    <MenuItem label="Item with a Link and icon" href="https://github.com/sapcc/juno" icon="help" />,
    <MenuItem label="Item with OnClick" onClick={ () => {} } />, 
    <MenuItem label="Item with OnClick and Icon" onClick={ () => {} } icon="deleteForever" />, 
  ]
}

export const Small = Template.bind({})
Small.args = {
  variant: "small",
  children: [
    <MenuItem label="Label only" />,
    <MenuItem label="Label with Icon" icon="help" />,
    <MenuItem label="Item with a Link" href="https://github.com/sapcc/juno" />,
    <MenuItem label="Item with a Link and icon" href="https://github.com/sapcc/juno" icon="help" />,
    <MenuItem label="Item with OnClick" onClick={ () => {} } />, 
    <MenuItem label="Item with OnClick and Icon" onClick={ () => {} } icon="deleteForever" />, 
  ]
}

export const WithASection = Template.bind({})
WithASection.args = {
  children: [
    <MenuSection>
      <MenuItem label="Label only" />
      <MenuItem label="Label with Icon" icon="help" />
    </MenuSection>,
    <MenuSection title="Danger Zone">
      <MenuItem label="Item with a Link" href="https://github.com/sapcc/juno" />
      <MenuItem label="Item with a Link and icon" href="https://github.com/sapcc/juno" icon="help" />
      <MenuItem label="Item with OnClick" onClick={ () => {} } /> 
      <MenuItem label="Item with OnClick and Icon" onClick={ () => {} } icon="deleteForever" />
    </MenuSection>
  ]
}

