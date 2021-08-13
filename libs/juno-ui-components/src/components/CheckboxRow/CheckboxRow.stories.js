import React from "react"
import { CheckboxRow } from "./index.js"

export default {
  title: "Design System/Forms/CheckboxRow",
  component: CheckboxRow,
  argTypes: {},
}

const Template = (args) => <CheckboxRow {...args} />

export const Default = Template.bind({})
Default.args = {
	label: "Default Checkbox Row",
	id: "default"
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
	name: "my-input",
	label: "Checkbox Row with Help text",
	helptext: "Oh so helpful helptext",
	id: "withHelptext"
}

export const Required = Template.bind({})
Required.args = {
	label: "Required Checkbox Row",
	required: true,
	id: "required"
}