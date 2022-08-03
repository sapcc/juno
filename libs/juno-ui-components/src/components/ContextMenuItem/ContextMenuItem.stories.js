import React from "react"
import { ContextMenuItem } from "./index.js"

export default {
  title: "WiP/ContextMenu/ContextMenuItem",
  component: ContextMenuItem,
  argTypes: {},
}

const Template = (args) => <ContextMenuItem {...args} />

export const Default = Template.bind({})
Default.args = {
	label: "Context Menu Item"
}