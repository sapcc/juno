import React from "react"
import { Radio } from "./index.js"

export default {
  title: "Forms/Base Elements/Radio",
  component: Radio,
  argTypes: {},
}

const Template = (args) => <Radio {...args} />

export const Default = Template.bind({})
Default.args = {
  checked: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  checked: true,
  disabled: true,
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true
}
