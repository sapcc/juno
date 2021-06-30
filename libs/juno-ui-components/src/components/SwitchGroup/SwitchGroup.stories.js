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