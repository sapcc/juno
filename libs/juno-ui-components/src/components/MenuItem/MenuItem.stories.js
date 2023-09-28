import React from "react"
import { MenuItem } from "./MenuItem.component"
import { Menu } from "../Menu/Menu.component"
import { Button } from "../Button/index"
import { knownIcons } from "../Icon/Icon.component"


export default {
  title: "WiP/Menu/MenuItem",
  component: MenuItem,
  argTypes: {
		icon: {
			options: [ 'default', ...knownIcons ],
			control: { type: 'select' }
		},
		children: {
      control: false
    },
	},
}

const Template = (args) => <Menu><MenuItem {...args} /></Menu>

const SmallTemplate = (args) => <Menu variant="small"><MenuItem {...args} /></Menu>

export const Default = Template.bind({})
Default.args = {
	label: "Menu Item",
}

export const SmallMenuItem = SmallTemplate.bind({})
SmallMenuItem.args = {
	label: "Small menu item"
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
}

export const WithChildren = Template.bind({})
WithChildren.args = {
	children: [
		<Button label="Delete" size="small" variant="subdued" icon="deleteForever" className="jn-w-full" key="1" />
	],
}

export const Disabled = Template.bind({})
Disabled.args = {
	disabled: true,
	label: "Disabled Item"
}

export const DisabledLink = Template.bind({})
DisabledLink.args = {
	disabled: true,
	label: "Disabled Item as Link",
	href: "https://github.com/sapcc/juno",
}