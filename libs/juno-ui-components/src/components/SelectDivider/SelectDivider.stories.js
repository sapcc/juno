import React from "react"
import { SelectDivider } from "./index.js"
import { Select } from "../Select/index.js"
import { SelectOption } from "../SelectOption/index.js"

export default {
  title: "Forms/Select/SelectDivider",
  component: SelectDivider,
  argTypes: {},
}

const Template = () => {
  return (
    <Select open>
      <SelectOption value="1">1</SelectOption>
      <SelectDivider />
      <SelectOption value="3">3</SelectOption>
    </Select>
  )
}

export const Default = Template.bind({})
Default.args = {}

