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

export const Required = Template.bind({})
Required.args = {
  label: "Required Textarea",
  required: true,
}
