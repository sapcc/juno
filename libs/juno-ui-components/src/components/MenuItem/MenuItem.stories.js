import React from "react"
import { MenuItem } from "./index.js"
import { Button } from "../Button/index.js"


export default {
  title: "WiP/Menu/MenuItem",
  component: MenuItem,
  argTypes: {},
}

const Template = (args) => <MenuItem {...args} />

export const Default = Template.bind({})
Default.args = {
	label: "Menu Item"
}

export const WithIcon = Template.bind({})
WithIcon.args = {
	label: "Menu Item with Icon",
	icon: "deleteForever"
}

export const AsLink = Template.bind({})
AsLink.args = {
	label: "Menu Item as Link",
	href: "https://github.com/sapcc/juno",
}

export const AsButton = Template.bind({})
AsButton.args = {
	label: "Menu Item as Button",
	onClick: (() => (console.log("clicked")))
}

export const WithChildren = Template.bind({})
WithChildren.args = {
	children: [
		<Button label="Delete" size="small" variant="subdued" icon="deleteForever" />
	]
}