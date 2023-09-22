import React from "react"
import { BreadcrumbItem } from "./index"
import { knownIcons } from "../Icon/Icon.component.js"


const Template = (args) => {
  return (<BreadcrumbItem {...args} />)
}

export default {
  title: "Components/Breadcrumb/BreadcrumbItem",
  component: BreadcrumbItem,
  argTypes: {
    icon: {
      options: ['default', ...knownIcons],
      control: {type: 'select'}
    },
    children: {
      control: false
    },
  },
}

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story:
        "A default breadcrumb item",
    },
  },
}
Default.args = {
  label: "Breadcrumb Item"
}

export const WithIcon = Template.bind({})
WithIcon.parameters = {
  docs: {
    description: {
      story:
        "Pass any available icon name to render an additional icon for the item.",
    },
  },
}
WithIcon.args = {
  icon: "place",
  label: "Breadcrumb Item with Icon",
}

export const Active = Template.bind({})
Active.parameters = {
  docs: {
    description: {
      story:
        "An active item represents the current page.",
    },
  },
}
Active.args = {
  label: "Active Breadcrumb Item",
  active: true,
}

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    description: {
      story:
        "A disabled breadcrumb item.",
    },
  },
}
Disabled.args = {
  label: "Disabled Breadcrumb Item",
  disabled: true,
}

export const Home = Template.bind({})
Home.parameters = {
  docs: {
    description: {
      story:
        "Typically the first item in a breadcrumb.",
    },
  },
}
Home.args = {
  label: "",
  icon: "home",
}