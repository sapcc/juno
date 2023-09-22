import React from "react"
import { Breadcrumb } from "./index"
import { BreadcrumbItem } from "../BreadcrumbItem/index"
import { Default as Item } from "../BreadcrumbItem/BreadcrumbItem.stories"
import { Home as HomeItem } from "../BreadcrumbItem/BreadcrumbItem.stories"
import { Active as ActiveItem } from "../BreadcrumbItem/BreadcrumbItem.stories"
import { Disabled as DisabledItem } from "../BreadcrumbItem/BreadcrumbItem.stories"
import { WithIcon as ItemWithIcon } from  "../BreadcrumbItem/BreadcrumbItem.stories"



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
  argTypes: {
    children: {
      control: false,
    },
  },
}

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story:
        "Generic breadcrumb component. Use this to Wrap `Breadcrumb` items or custom children in a breadcrumb.",
    },
  },
}
Default.args = {
  children: [
    {...HomeItem.args},
    {...Item.args},
    {...ItemWithIcon.args, },
    {...DisabledItem.args},
    {...ActiveItem.args},
  ]
}