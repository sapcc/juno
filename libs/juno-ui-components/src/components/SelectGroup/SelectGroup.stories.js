import React from "react"
import { Select } from "../Select/index.js"
import { SelectGroup } from "./index.js"
import { SelectOption } from "../SelectOption/index.js"

export default {
  title: "Forms/Select/SelectGroup",
  component: SelectGroup,
  argTypes: {},
}

const Template = ({children, ...args}) => {
  return (
    <Select open>
      <SelectGroup {...args}>{children}</SelectGroup>
    </Select>
  )
}

export const Default = Template.bind({})
Default.args = {
  children: [
    <SelectOption value="1">1</SelectOption>,
    <SelectOption value="2">2</SelectOption>,
    <SelectOption value="3">3</SelectOption>
  ]
}

export const Labelled = Template.bind({})
Labelled.args = {
  label: "Labelled Group",
  children: [
    <SelectOption value="1">1</SelectOption>,
    <SelectOption value="2">2</SelectOption>,
    <SelectOption value="3">3</SelectOption>
  ]
}