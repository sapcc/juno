import React from "react"
import { TopNavigation } from "./index.js"
import { TopNavigationItem } from "../TopNavigationItem/TopNavigationItem.component"

export default {
  title: "Navigation/TopNavigation/TopNavigation",
  component: TopNavigation,
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

const Template = ({children, ...args}) => (
  <TopNavigation {...args}> 
    { children }
  </TopNavigation>
)

export const Default = Template.bind({})
Default.args = {
  children: [
    <TopNavigationItem label="Item 1" key="item-1" />,
    <TopNavigationItem label="Item 2" key="item-2" active />,
    <TopNavigationItem label="Item with Icon" key="item-3" icon="warning" />,
    <TopNavigationItem label="Disabled Item" key="item-4" disabled />
  ]
}

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    description: {
      story: "All navigation items can be disabled by passing `disabled` to the `TabNavigation`."
    }
  }
},
Disabled.args = {
  disabled: true,
  children: 
    [
      <TopNavigationItem label="Item 1" key="item-1" />,
      <TopNavigationItem label="Item 2" key="item-2" />,
      <TopNavigationItem label="Item 3" key="item-3" />,
      <TopNavigationItem label="Item 4" key="item-4" />
    ]
}

export const WithValues = Template.bind({})
WithValues.parameters = {
  docs: {
    description: {
      story: "When needed, navigation items can take a `value` prop as a technical identifier that is different form the human-readable `label`. When using `value` on the navigation items, the respective `value`must be used when setting the `activeItem` prop on the TopNavigation. Alternatively, an individual `TopNavigationItem` can be set to `active`."
    }
  }
}
WithValues.args = {
  activeItem: "i-3",
  children: [
    <TopNavigationItem label="Item 1" key="item-1" value="i-1"/>,
    <TopNavigationItem label="Item 2" key="item-2" value="i-2"/>,
    <TopNavigationItem label="Item 3" key="item-3" value="i-3"/>,
    <TopNavigationItem label="Item 4" key="item-4" value="i-4"/>
  ]
}