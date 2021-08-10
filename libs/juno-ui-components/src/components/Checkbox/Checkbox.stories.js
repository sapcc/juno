import React from "react"
import { Checkbox } from "./index.js"

export default {
  title: "Design System/Forms/Checkbox",
  component: Checkbox,
  argTypes: {},
}

const Template = (args) => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {
}

export const Checked = Template.bind({})
Checked.args = {
  checked: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}



