import React from "react"
import { TextInput } from "./index.js"

export default {
  title: "Forms/Base Elements/TextInput",
  component: TextInput,
  argTypes: {},
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
Invalid.parameters = {
  docs: {
    description: {
      story:
        "Note the pure `TextInput` component will not show the icon when invalidated. Use TextinoputRow instead.",
    },
  },
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
}
Valid.parameters = {
  docs: {
    description: {
      story:
        "Note the pure `TextInput` component will not show the icon when set to valid. Use TextinoputRow instead.",
    },
  },
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
