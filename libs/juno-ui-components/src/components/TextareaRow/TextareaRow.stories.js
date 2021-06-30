import React from "react"
import { TextareaRow } from "./index.js"

export default {
	title: "Design System/Forms/TextareaRow",
	component: TextareaRow,
	argTypes: {},
}

const Template = (args) => <TextareaRow {...args} />

export const Default = Template.bind({})
Default.args = {
	label: "Default Textarea row",
}

export const HorizontalLayout = Template.bind({})
HorizontalLayout.args = {
	layout: "horizontal",
	label: "Horizontal  Textarea row",
}

export const VerticalLayout = Template.bind({})
VerticalLayout.args = {
	layout: "vertical",
	name: "my-input",
	label: "Vertical Textarea row",
}

export const VerticalWithHelpText = Template.bind({})
VerticalWithHelpText.args = {
	layout: "vertical",
	name: "my-input",
	label: "Vertical Textarea row with Helptext",
	helptext: "Oh so helpful helptext"
}