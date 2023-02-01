import React from "react"
import { Select } from "./index.js"

export default {
  title: "Forms/Base Elements/Select",
  component: Select,
  argTypes: {},
}

const Template = (args) => <Select {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
}

export const Error = Template.bind({})
Error.args = {
  error: true,
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}