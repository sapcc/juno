import React from "react"
import { TextInput } from "./index.js"

export default {
  title: "Design System/Forms/TextInput",
  component: TextInput,
  argTypes: {},
}

const Template = (args) => <TextInput {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Disabled = Template.bind({})
Disabled.args = {
	disabled: true,
}

export const ReadOnly = Template.bind({})
ReadOnly.args = {
	readOnly: true,
}

export const Email = Template.bind({})
Email.args = {
	type: 'email',
}

export const Tel = Template.bind({})
Tel.args = {
	type: 'tel',
}

export const Url = Template.bind({})
Url.args = {
	type: 'url',
}

export const Number = Template.bind({})
Number.args = {
	type: 'number',
}