import React from "react"
import { TextInput } from "./index.js"

export default {
  title: "Forms/TextInput",
  component: TextInput,
  argTypes: {
    errortext: {
      control: false
    },
    helptext: {
      control: false
    },
    successtext: {
      control: false
    },
  },
}

const Template = (args) => <TextInput {...args} />

export const Default = Template.bind({})
Default.args = {}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "Text Input"
}

export const RequiredWithLabel = Template.bind({})
RequiredWithLabel.args = {
  label: "Required Text Input",
  required: true,
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
}

export const Autofocus = Template.bind({})
Autofocus.args = {
  autoFocus: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const ReadOnly = Template.bind({})
ReadOnly.args = {
  readOnly: true,
}

export const Email = Template.bind({})
Email.args = {
  type: "email",
}

export const Tel = Template.bind({})
Tel.args = {
  type: "tel",
}

export const Url = Template.bind({})
Url.args = {
  type: "url",
}

export const Number = Template.bind({})
Number.args = {
  type: "number",
}

export const Password = Template.bind({})
Password.args = {
  type: "password",
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
  helptext: "This is an explanatory text referring to the input"
}

export const WithHelpTextAsNode = Template.bind({})
WithHelpTextAsNode.args = {
  helptext: <>This is a helptext with a <a href="#">Link</a></>
}

export const WithSuccessText = Template.bind({})
WithSuccessText.args = {
  successtext: "This field is a great success!"
}

export const WithErrorText = Template.bind({})
WithErrorText.args = {
  errortext: "This field has an error"
}
