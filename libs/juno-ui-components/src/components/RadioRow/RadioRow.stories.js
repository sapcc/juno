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
	label: "Default Radio Row",
	id: "radio-row-default",
}

export const Checked = Template.bind({})
Checked.args = {
	label: "Checked Radio Row",
	checked: true,
	id: "radio-row-checked",
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
	name: "my-input",
	label: "Radio Row with help text",
	helptext: "Oh so helpful helptext",
	id: "radio-row-withHelptext",
}

export const Disabled = Template.bind({})
Disabled.args = {
	label: "Disbaled Radio",
	id: "radio-row-disabled",
	disabled: true,
}