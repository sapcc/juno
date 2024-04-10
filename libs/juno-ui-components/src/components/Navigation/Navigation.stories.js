import React from "react"
import { Navigation } from "./index.js"
import { NavigationItem } from "../NavigationItem/"

export default {
  title: "Internal/Navigation",
  component: Navigation,
  argTypes: {
    children: {
      control: false,
    },
    role: {
      options: ["TabNavigation", "TopNavigation", "SideNavigation"],
      control: { type: "select" },
    },
  },
}

const Template = ({ children, ...props }) => (
  <Navigation {...props}>{children}</Navigation>
)

export const DefaultWithChildren = {
  render: Template,
  args: {
    activeItem: "Item 1",
    children: [
      <NavigationItem key="i-1">Item 1</NavigationItem>,
      <NavigationItem key="i-2">Item 2</NavigationItem>,
      <NavigationItem key="i-3">Item 3</NavigationItem>,
      <NavigationItem key="i-4" disabled>
        Item 4
      </NavigationItem>,
    ],
  },
}

export const WithValuesAndLabels = {
  render: Template,
  args: {
    children: [
      <NavigationItem key="i-1" value="i-1" label="Item 1" />,
      <NavigationItem key="i-2" value="i-2" label="Item 2" />,
      <NavigationItem key="i-3" value="i-3" label="Item 3" />,
    ],
  },
}

export const ValuesOnly = {
  render: Template,
  args: {
    children: [
      <NavigationItem key="i-1" value="Item 1" />,
      <NavigationItem key="i-2" value="Item 2" active />,
      <NavigationItem key="i-3" value="Item 3" />,
    ],
  },
}

export const Disabled = {
  render: Template,
  args: {
    disabled: true,
    children: [
      <NavigationItem key="i-1">Item 1</NavigationItem>,
      <NavigationItem key="i-2" active>
        Item 2
      </NavigationItem>,
      <NavigationItem key="i-3">Item 3</NavigationItem>,
    ],
  },
}

export const ItemsAsLinks = {
  render: Template,
  args: {
    children: [
      <NavigationItem href="https://www.sap.com">Link 1</NavigationItem>,
      <NavigationItem href="https://www.sap.com">Link 2</NavigationItem>,
      <NavigationItem href="https://www.sap.com">Link 3</NavigationItem>,
    ],
  },
}
