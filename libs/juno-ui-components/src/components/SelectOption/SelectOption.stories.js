import React from "react"
import { SelectOption } from "./index.js"

export default {
  title: "Design System/Forms/Select/SelectOption",
  component: SelectOption,
  argTypes: {},
}

const Template = (args) => <SelectOption {...args} />

export const Default = Template.bind({})
Default.args = {
	value: "my-option-value",
	label: "My option"
}

export const Disabled = Template.bind({})
Disabled.args = {
	value: "my-disabled-option-value",
	label: "My disabled option",
	disabled: true
}