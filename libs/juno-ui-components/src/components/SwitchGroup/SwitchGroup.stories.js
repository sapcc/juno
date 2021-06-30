import React from "react"
import { SwitchGroup } from "./index.js"

export default {
  title: "Design System/Forms/SwitchGroup",
  component: SwitchGroup,
  argTypes: {},
}

const Template = (args) => <SwitchGroup {...args} />

export const Default = Template.bind({})
Default.args = {
	label: "Default Switch Group",
}

export const Checked = Template.bind({})
Checked.args = {
  label: "Checked Switch Group",
  checked: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Disabled Switch Group",
  checked: true,
}

