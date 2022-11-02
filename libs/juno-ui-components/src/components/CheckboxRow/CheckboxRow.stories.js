import React from "react"
import { CheckboxRow } from "./index.js"

export default {
  title: "Forms/Checkbox/CheckboxRow",
  component: CheckboxRow,
  argTypes: {},
}

const Template = (args) => <CheckboxRow {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "Default Checkbox Row",
  id: "default",
}

export const Checked = Template.bind({})
Checked.args = {
  label: "Checked CheckboxRow",
  id: "checked",
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
  name: "my-input",
  label: "Checkbox Row with Help text",
  helptext: "Oh so helpful helptext",
  id: "withHelptext",
}

export const WithHelpTextWithLink = Template.bind({})
WithHelpTextWithLink.args = {
  name: "my-input",
  label: "Checkbox Row with Help text",
  helptext: <>Helptext with a <a href="#">Link</a></>,
  id: "withHelptext-withLink",
}

export const Required = Template.bind({})
Required.args = {
  label: "Required Checkbox Row",
  required: true,
  id: "required",
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Disabled Checkbox Row",
  id: "disabled-checkbox-row",
  disabled: true,
}

export const Invalid = Template.bind({})
Invalid.args = {
  label: "Invalid Checkbox",
  id: "invalid-checkbox-row",
  invalid: true,
}

export const WithErrorText = Template.bind({})
WithErrorText.args = {
  label: "Checkbox invalidated by errortext",
  id: "invalid-checkbox-by-errortext",
  errortext: "Pass an errortext to invalidate a CheckboxRow"
}
