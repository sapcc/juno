import React from "react"
import { RadioRow } from "./index.js"

export default {
  title: "Design System/Forms/RadioRow",
  component: RadioRow,
  argTypes: {},
}

const Template = (args) => <RadioRow {...args} />

export const Default = Template.bind({})
Default.args = {
	label: "Default Radio Row"
}

export const Checked = Template.bind({})
Checked.args = {
	label: "Checked Radio Row",
	checked: true,
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
	name: "my-input",
	label: "Radio Row with help text",
	helptext: "Oh so helpful helptext",
}