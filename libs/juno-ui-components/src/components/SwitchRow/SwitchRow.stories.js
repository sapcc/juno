import React from "react"
import { SwitchRow } from "./index.js"

export default {
  title: "Forms/SwitchRow",
  component: SwitchRow,
  argTypes: {},
}

const Template = (args) => <SwitchRow {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "Default Switch Row",
}

export const On = Template.bind({})
On.args = {
  label: "On Switch Row",
  on: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Disabled Switch Row",
  on: true,
  disabled: true,
}

export const WithHelptext = Template.bind({})
WithHelptext.args = {
  label: "Switch Row with Helptext",
  on: true,
  helptext: "Oh so helpful helptext",
}

export const Required = Template.bind({})
Required.args = {
  label: "Required Switch",
  required: true,
}
