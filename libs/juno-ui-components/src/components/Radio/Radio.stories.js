import React from "react"
import { Radio } from "./index.js"

export default {
  title: "Forms/Radio",
  component: Radio,
  argTypes: {},
}

const Template = (args) => <Radio {...args} />

export const Default = Template.bind({})
Default.args = {
  checked: true,
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  id: "radio-with-label",
  label: "Radio with label",
}

export const Required = Template.bind({})
Required.args = {
  required: true,
  label: "Required Radio",
  helptext: "Only a Radio with a label passed will render a required marker."
}

export const WithHelptext = Template.bind({})
WithHelptext.args = {
  label: "A Radio",
  helptext: "Never comes alone"
}

export const WithHelpTextAsNode = Template.bind({})
WithHelpTextAsNode.args = {
  label: "A Radio",
  helptext: <>Helptext with a <a href="#">Link</a></>,
}

export const Disabled = Template.bind({})
Disabled.args = {
  checked: true,
  disabled: true,
  label: "Disabled Radio with label",
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
  label: "Validated Radio with label and icon",
  successtext: "This option is valid",
  helptext: "Validation icons will only show when there is a label on the Radio",
}

export const InvalidWithLabel = Template.bind({})
InvalidWithLabel.args = {
  invalid: true,
  label: "Invalidated Radio with label and icon",
  helptext: "Validation icons will only show when there is a label on the Radio",
  errortext: "This option is invalid.",
}


