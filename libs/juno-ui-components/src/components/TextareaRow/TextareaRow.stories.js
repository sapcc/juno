import React from "react"
import { TextareaRow } from "./index.js"

export default {
  title: "Forms/TextareaRow",
  component: TextareaRow,
  argTypes: {},
}

const Template = (args) => <TextareaRow {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "Textarea Row",
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Disabled Textarea Row",
  disabled: true,
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
  name: "my-input",
  label: "Textarea Row with Helptext",
  helptext: "Oh so helpful helptext",
}

export const WithHelpTextWithLink = Template.bind({})
WithHelpTextWithLink.args = {
  name: "my-input",
  label: "Textarea Row with Helptext",
  helptext: <>Helptext with a <a href="#">Link</a></>,
}

export const Required = Template.bind({})
Required.args = {
  label: "Required Textarea",
  required: true,
}

export const Invalid = Template.bind({})
Invalid.args = {
  label: "Invalid TextareaRow",
  invalid: true,
}

export const WithErrorText = Template.bind({})
WithErrorText.args = {
  label: "Textarea Row with Error Text",
  helptext: "Oh so helpful helptext",
  errortext: "When passed an errortext prop, the TextareaRow will be set to invalid automatically.",
}
WithErrorText.parameters = {
  docs: {
    description: {
      story:
        "Passing an `errortext` prop to the TextareaRow component will automatically invalidate it, so there is no need to explicitly set `invalid` as well.",
    },
  },
}

export const Valid = Template.bind({})
Valid.args = {
  label: "Valid TextareaRow",
  valid: true,
}

export const WithSuccessText = Template.bind({})
WithSuccessText.args = {
  label: "Textarea Row with Success Text",
  helptext: "Oh so helpful helptext",
  successtext: "When passed a successtext prop, the TextareaRow will be set to valid automatically.",
}
WithSuccessText.parameters = {
  docs: {
    description: {
      story:
        "Passing a `successtext` prop to the TextareaRow component will automatically set it to valid, so there is no need to explicitly set `valid` as well.",
    },
  },
}
