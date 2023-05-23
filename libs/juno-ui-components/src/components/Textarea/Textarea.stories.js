import React from "react"
import { Textarea } from "./index.js"

export default {
  title: "Forms/Textarea",
  component: Textarea,
  argTypes: {},
}

const Template = (args) => <Textarea {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: "Some text here",
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "Textarea"
}

export const RequiredWithLabel = Template.bind({})
RequiredWithLabel.args = {
  label: "Required Textarea",
  required: true,
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
  placeholder: "Some invalid text here",
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
  placeholder: "Some valid text here",
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  placeholder: "A disabled textarea",
}

export const Autofocus = Template.bind({})
Autofocus.args = {
  placeholder: "An autofocussing textarea",
  autoFocus: true,
}
