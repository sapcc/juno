import React from "react"
import { ComboBox } from "../ComboBox/ComboBox.component"
import { ComboBoxOption } from "../ComboBoxOption/ComboBoxOption.component"

export default {
  title: "Forms/ComboBox/ComboBoxOption",
  component: ComboBoxOption,
  argTypes: {},
}

const Template = (args) => {
  return (
    <ComboBox>
      <ComboBoxOption {...args} />
    </ComboBox>
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
  children:
    "Option 1"
}