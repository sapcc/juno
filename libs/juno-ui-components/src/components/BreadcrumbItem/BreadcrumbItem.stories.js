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
      control: {
        type: 'select',
        options: ['default', ...knownIcons],
      }
    },
  },
}

export const Default = Template.bind({})
Default.args = {
  label: "Breadcrumb Item"
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  icon: "place",
  label: "Breadcrumb Item with Icon",
}

export const Active = Template.bind({})
Active.args = {
  label: "Active Breadcrumb Item",
  active: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Disabled Breadcrumb Item",
  disabled: true,
}

export const Home = Template.bind({})
Home.args = {
  label: "",
  icon: "home",
}