import React from "react"
import { Checkbox } from "./index.js"

export default {
  title: "Forms/Checkbox/Checkbox",
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

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "Checkbox with Label",
}

export const Required = Template.bind({})
Required.args = {
  required: true,
  label: "Required Checkbox",
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const Indeterminate = Template.bind({})
Indeterminate.args = {
  indeterminate: true,
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
}

export const ValidWithLabel = Template.bind({})
ValidWithLabel.args = {
  valid: true,
  label: "Validated checkbox with label and icon",
  successtext: "This option is valid.",
  helptext: "Validation icons will only show when there is a label on the Checkbox",
}

export const InvalidWithLabel = Template.bind({})
InvalidWithLabel.args = {
  invalid: true,
  label: "Invalidated checkbox with label and icon",
  successtext: "This option is invalid.",
  helptext: "Validation icons will only show when there is a label on the Checkbox",
}

export const IndeterminateWithLabel = Template.bind({})
IndeterminateWithLabel.args = {
  indeterminate: true,
  label: "Indeterminate checkbox with label",
  helptext: "A checkbox can be indeterminate as parent of multiple checkboxes with mixed checked states",
}
