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
	label: "Text Input Row",
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
	name: "my-input",
	label: "Text Input Row with Help Text",
	helptext: "Oh so helpful helptext"
}


