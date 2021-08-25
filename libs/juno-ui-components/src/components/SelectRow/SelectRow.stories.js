import React from "react"
import { SelectRow } from "./index.js"
import { Default as DefaultSelectOption } from "../SelectOption/SelectOption.stories"

export default {
  title: "Design System/Forms/SelectRow",
  component: SelectRow,
  argTypes: {},
}

const Template = (args) => (
	<SelectRow {...args}>
		{args.children.map((child) => (
			<DefaultSelectOption {...child} />
		))}
	</SelectRow>
)

export const Default = Template.bind({})
Default.args = {
	label: "Select Row",
	children: [DefaultSelectOption.args]
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
	name: "my-select",
	label: "Select Row with Helptext",
	helptext: "Oh so helpful helptext",
	children: [DefaultSelectOption.args]
}

export const Required = Template.bind({})
Required.args = {
	name: "my-select",
	label: "Required Select Row",
	required: true,
	children: [DefaultSelectOption.args]
}

export const Disabled = Template.bind({})
Disabled.args = {
	name: "disabled-select",
	label: "Disabled Select Row",
	children: [DefaultSelectOption.args],
	disabled: true,
	required: true,
	helptext: "Oh so helpful helptext"
}