import React from "react"
import { SwitchRow } from "./index.js"

export default {
  title: "Design System/Forms/SwitchRow",
  component: SwitchRow,
  argTypes: {},
}

const Template = (args) => <SwitchRow {...args} />

export const Default = Template.bind({})
Default.args = {
	label: "Default Switch Row",
}

export const Checked = Template.bind({})
Checked.args = {
  label: "Checked Switch Row",
  checked: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Disabled Switch Row",
  checked: true,
}

