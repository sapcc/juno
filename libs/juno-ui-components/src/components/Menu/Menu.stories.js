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
    <MenuItem label="Label only" key="1" />,
    <MenuItem label="Label with Icon" icon="help" key="2"/>,
    <MenuItem label="Item with a Link" href="https://github.com/sapcc/juno" key="3"/>,
    <MenuItem label="Item with a Link and icon" href="https://github.com/sapcc/juno" icon="help" key="4"/>,
    <MenuItem label="Item with OnClick" onClick={ () => {} } key="5"/>, 
    <MenuItem label="Item with OnClick and Icon" onClick={ () => {} } icon="deleteForever" key="6"/>, 
  ]
}

export const Small = Template.bind({})
Small.args = {
  variant: "small",
  children: [
    <MenuItem label="Label only" key="1"/>,
    <MenuItem label="Label with Icon" icon="help" key="2"/>,
    <MenuItem label="Item with a Link" href="https://github.com/sapcc/juno" key="3"/>,
    <MenuItem label="Item with a Link and icon" href="https://github.com/sapcc/juno" icon="help" key="4"/>,
    <MenuItem label="Item with OnClick" onClick={ () => {} } key="5"/>, 
    <MenuItem label="Item with OnClick and Icon" onClick={ () => {} } icon="deleteForever" key="6"/>, 
  ]
}

export const WithASection = Template.bind({})
WithASection.args = {
  children: [
    <MenuSection key="m1">
      <MenuItem label="Label only" key="1"/>
      <MenuItem label="Label with Icon" icon="help" key="2"/>
    </MenuSection>,
    <MenuSection title="Danger Zone" key="m2">
      <MenuItem label="Item with a Link" href="https://github.com/sapcc/juno" key="3"/>
      <MenuItem label="Item with a Link and icon" href="https://github.com/sapcc/juno" icon="help" key="4"/>
      <MenuItem label="Item with OnClick" onClick={ () => {} } key="5"/> 
      <MenuItem label="Item with OnClick and Icon" onClick={ () => {} } icon="deleteForever" key="6"/>
    </MenuSection>
  ]
}

