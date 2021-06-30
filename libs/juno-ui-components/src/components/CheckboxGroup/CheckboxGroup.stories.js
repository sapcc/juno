import React from "react"
import { CheckboxGroup } from "./index.js"

export default {
  title: "Design System/Forms/CheckboxGroup",
  component: CheckboxGroup,
  argTypes: {},
}

const Template = (args) => <CheckboxGroup {...args} />

export const Default = Template.bind({})
Default.args = {
	label: "Default Checkbox Group",
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
	name: "my-input",
	label: "Checkbox Group with Help text",
	helptext: "Oh so helpful helptext"
}