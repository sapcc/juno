import React from "react"
import { TextInputRow } from "./index.js"

export default {
  title: "Design System/Forms/TextInputRow",
  component: TextInputRow,
  argTypes: {},
}

const Template = (args) => <TextInputRow {...args} />

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


