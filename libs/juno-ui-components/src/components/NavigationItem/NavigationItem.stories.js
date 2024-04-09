import React from "react"
import { NavigationItem } from "./index.js"
import { Navigation } from "../Navigation/index"

export default {
  title: "Internal/Navigation/NavigationItem",
  component: NavigationItem,
  argTypes: {},
  //parameters: { actions: { argTypesRegex: null } },
  decorators: [(story) => <Navigation>{story()}</Navigation>],
}

const Template = ({ children, ...args }) => (
  <NavigationItem {...args}>{children}</NavigationItem>
)

export const DefaultWithChildren = {
  render: Template,
  args: {
    children: "Navigation Item",
  },
}

export const WithValueAndLabel = {
  render: Template,
  args: {
    value: "item-1",
    label: "Navigation Item 1",
  },
}

export const ActiveItem = {
  render: Template,
  args: {
    active: true,
    children: "Active Item",
  },
}

export const DisabledItem = {
  render: Template,
  args: {
    disabled: true,
    children: "Disabled Item",
  },
}
