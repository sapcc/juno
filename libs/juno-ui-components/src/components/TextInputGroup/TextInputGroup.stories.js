import React from "react"
import { TextInputGroup } from "./index.js"

export default {
  title: "Design System/Forms/TextInputGroup",
  component: TextInputGroup,
  argTypes: {},
}

const Template = (args) => <TextInputGroup {...args} />

export const Default = Template.bind({})
Default.args = {
	label: "Default",
}

export const HorizontalLayout = Template.bind({})
HorizontalLayout.args = {
	layout: "horizontal",
	name: "my-input",
	label: "Horizontal",
}

export const VerticalLayout = Template.bind({})
VerticalLayout.args = {
	layout: "vertical",
	name: "my-input",
	label: "Vertical",
}

export const VerticalWithHelpText = Template.bind({})
VerticalWithHelpText.args = {
	layout: "vertical",
	name: "my-input",
	label: "Vertical",
	helptext: "Oh so helpful helptext"
}


