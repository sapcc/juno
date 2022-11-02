import React from "react"
import { Checkbox } from "./index.js"

export default {
  title: "Forms/Base Elements/Checkbox",
  component: Checkbox,
  argTypes: {},
}

const Template = (args) => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Checked = Template.bind({})
Checked.args = {
  checked: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const Indeterminate = Template.bind({})
Indeterminate.args = {
  indeterminate: true,
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
}
