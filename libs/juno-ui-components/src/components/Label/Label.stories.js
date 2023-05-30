import React from "react"
import { Label } from "./index.js"

export default {
  title: "Forms/Label",
  component: Label,
  argTypes: {},
}

const Template = (args) => <Label {...args} />

export const Default = Template.bind({})
Default.args = {
  text: "My Label",
}

export const Disabled = Template.bind({})
Disabled.args = {
  text: "My disabled label",
  disabled: true,
}

export const Required = Template.bind({})
Required.args = {
  text: "My required label",
  required: true,
}
