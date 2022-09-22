import React from "react"
import { Breadcrumb } from "./index"
import { BreadcrumbItem } from "../BreadcrumbItem/index"
import { Default as Item } from "../BreadcrumbItem/BreadcrumbItem.stories"
import { Home as HomeItem } from "../BreadcrumbItem/BreadcrumbItem.stories"
import { Active as ActiveItem } from "../BreadcrumbItem/BreadcrumbItem.stories"
import { Disabled as DisabledItem } from "../BreadcrumbItem/BreadcrumbItem.stories"



const Template = ({ children, ...args}) => {
  return (
    <Breadcrumb {...args}>
      { children.map((child, i) => (
        <BreadcrumbItem {...child} key={i} />
      ))}
    </Breadcrumb>
  
  )
}

export default {
  title: "Components/Breadcrumb/Breadcrumb",
  component: Breadcrumb,
  argTypes: {},
}

export const Default = Template.bind({})
Default.args = {
  children: [
    {...HomeItem.args, label: "Home", icon: "place"},
    {...Item.args, children: "Child"}, // test with actual Icon component
    {...Item.args},
    {...ActiveItem.args},
  ]
}