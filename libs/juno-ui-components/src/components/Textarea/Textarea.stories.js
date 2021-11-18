import React from "react"
import { Textarea } from "./index.js"

export default {
  title: "Design System/Forms/Textarea",
  component: Textarea,
  argTypes: {},
}

const Template = (args) => <Textarea {...args} />

export const Default = Template.bind({})
Default.args = {
	placeholder: "Some text here"
}

export const Disabled = Template.bind({})
Disabled.args = {
	disabled: true,
	placeholder: "A disabled textarea"
}

export const Autofocus = Template.bind({})
Autofocus.args = {
	placeholder: "An autofocussing textarea",
	autoFocus: true
}

