import React from "react"
import { Message } from "./index.js"

export default {
  title: "Components/Message",
  component: Message,
}

const Template = (args) => <Message {...args} />

export const Default = Template.bind({})
Default.args = {
  text: "Default Message.",
}

export const WithTitle = Template.bind({})
WithTitle.args = {
  title: "Message",
  text: "Message with title.",
}

export const Warning = Template.bind({})
Warning.args = {
  variant: "warning",
  text: "Warning Message.",
}

export const Error = Template.bind({})
Error.args = {
  variant: "error",
  text: "Error Message.",
}

export const Danger = Template.bind({})
Danger.args = {
  variant: "danger",
  text: "Danger Message.",
}

export const Success = Template.bind({})
Success.args = {
  variant: "success",
  text: "Success Message",
}

export const Dismissible = Template.bind({})
Dismissible.args = {
  text: "Dismissible Message.",
  dismissible: true,
}
