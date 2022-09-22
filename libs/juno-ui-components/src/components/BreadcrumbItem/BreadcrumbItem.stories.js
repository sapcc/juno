import React from "react"
import { BreadcrumbItem } from "./index"


const Template = (args) => {
  return (<BreadcrumbItem {...args} />)
}

export default {
  title: "Components/Breadcrumb/BreadcrumbItem",
  component: BreadcrumbItem,
  argTypes: {},
}

export const Default = Template.bind({})
Default.args = {
  label: "Breadcrumb Item"
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
  label: "Home",
}