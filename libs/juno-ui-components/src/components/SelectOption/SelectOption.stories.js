import React from "react"
import { Select } from "../Select/"
import { SelectOption } from "./index.js"

export default {
  title: "Forms/Select/SelectOption",
  component: Select,
  argTypes: {},
}

const Template = (args) => {
  return (
    <Select open>
      <SelectOption {...args} />
    </Select>
  )
}

export const Default = Template.bind({})
Default.args = {
  value: "Option 1"
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  value: "Disabled Option"
}

export const ChildrenOnly = Template.bind({})
ChildrenOnly.args = {
  children: [
    "Option 1"
  ]
}