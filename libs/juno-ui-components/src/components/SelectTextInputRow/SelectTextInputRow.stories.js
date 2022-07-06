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
	label: "Select Something",
  options: [
    {label: "Value 1", value: "val-1"},
    {label: "Value 2", value: "val-2"},
    {label: "Value 3", value: "val-3"},
  ]
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
	helptext: "HelpText goes here",
  label: "Select Something",
  options: [
    {label: "Value 1", value: "val-1"},
    {label: "Value 2", value: "val-2"},
    {label: "Value 3", value: "val-3"},
  ]	
}


