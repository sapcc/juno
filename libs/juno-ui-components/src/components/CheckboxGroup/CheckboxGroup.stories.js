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

export const HorizontalLayout = Template.bind({})
HorizontalLayout.args = {
	layout: "horizontal",
	name: "my-input",
	label: "Horizontal Checkbox Group",
}


export const VerticalLayout = Template.bind({})
VerticalLayout.args = {
	layout: "vertical",
	name: "my-input",
	label: "Vertical Checkbox Group",
}

export const VerticalWithHelpText = Template.bind({})
VerticalWithHelpText.args = {
	layout: "vertical",
	name: "my-input",
	label: "Vertical Checkbxo Group with Help text",
	helptext: "Oh so helpful helptext"
}