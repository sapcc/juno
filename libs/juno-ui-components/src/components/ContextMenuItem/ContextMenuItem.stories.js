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

export const WithIcon = Template.bind({})
WithIcon.args = {
	label: "Context menu Item with Icon",
	icon: "deleteForever"
}

export const AsLink = Template.bind({})
AsLink.args = {
	label: "Context Menu Item as Link",
	href: "https://github.com/sapcc/juno",
}

export const AsButton = Template.bind({})
AsButton.args = {
	label: "Context Menu Item as Button",
	onClick: (() => (console.log("clicked")))
}