import React from "react"
import { TextareaGroup } from "./index.js"

export default {
	title: "Design System/Forms/TextareaGroup",
	component: TextareaGroup,
	argTypes: {},
}

const Template = (args) => <TextareaGroup {...args} />

export const Default = Template.bind({})
Default.args = {
	label: "Default Textarea group",
}

export const HorizontalLayout = Template.bind({})
HorizontalLayout.args = {
	layout: "horizontal",
	label: "Horizontal  Textarea group",
}

export const VerticalLayout = Template.bind({})
VerticalLayout.args = {
	layout: "vertical",
	name: "my-input",
	label: "Vertical Textarea group",
}

export const VerticalWithHelpText = Template.bind({})
VerticalWithHelpText.args = {
	layout: "vertical",
	name: "my-input",
	label: "Vertical Textarea group with Helptext",
	helptext: "Oh so helpful helptext"
}