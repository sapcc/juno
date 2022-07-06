import React from "react"
import { SelectTextInputRow } from "./index.js"

export default {
  title: "Forms/SelectTextInputRow",
  component: SelectTextInputRow,
  argTypes: {},
}

const Template = ({ ...args }) => (
  <SelectTextInputRow {...args} />
)

export const Default = Template.bind({})
Default.args = {
	label: "Select Something"
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
	helptext: "HelpText goes here",
	
}