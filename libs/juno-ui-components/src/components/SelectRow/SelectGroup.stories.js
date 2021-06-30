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
	label: "Default",
	children: [DefaultSelectOption.args]
}

export const HorizontalLayout = Template.bind({})
HorizontalLayout.args = {
	layout: "horizontal",
	name: "my-select",
	label: "Horizontal",
	children: [DefaultSelectOption.args]
}

export const VerticalLayout = Template.bind({})
VerticalLayout.args = {
	layout: "vertical",
	name: "my-select",
	label: "Vertical",
	children: [DefaultSelectOption.args]
}

export const VerticalWithHelpText = Template.bind({})
VerticalWithHelpText.args = {
	layout: "vertical",
	name: "my-select",
	label: "Vertical",
	helptext: "Oh so helpful helptext",
	children: [DefaultSelectOption.args]
}