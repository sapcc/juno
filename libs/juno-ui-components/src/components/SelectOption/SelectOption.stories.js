import React from "react"
import { Select } from "../Select/index.js"
import { SelectOption } from "./index.js"

export default {
  title: "Forms/Select/SelectOption",
  component: SelectOption,
  argTypes: {},
}

const Template = ({children, ...args}) => {
  return (
    <Select open>
      <SelectOption {...args}>{children}</SelectOption>
    </Select>
  )
}

export const Default = Template.bind({})
Default.args = {
  value: "option",
  children: "Option"
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  value: "disabled-option",
  children: "Disabled Option"
}