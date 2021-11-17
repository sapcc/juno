import React from "react"
import { Message } from "./index.js"

export default {
  title: "Design System/Message",
  component: Message,
  argTypes: {},
}

const Template = (args) => <Message {...args} />

export const Default = Template.bind({})
Default.args = {
	text: "Default Message."
}

export const WithTitle = Template.bind({})
WithTitle.args = {
	title: "Message",
	text: "Message with title."
}

export const Warning = Template.bind({})
Warning.args = {
	variant: "warning",
	text: "Warning Message."
}

export const Error = Template.bind({})
Error.args = {
	variant: "error",
	text: "Error Message."
}

export const Success = Template.bind({})
Success.args = {
	variant: "success",
	text: "Success Message"
}



