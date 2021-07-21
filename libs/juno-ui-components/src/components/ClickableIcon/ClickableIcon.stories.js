import React from "react"
import { ClickableIcon } from "./index.js"

export default {
  title: "Design System/ClickableIcon",
  component: ClickableIcon,
  argTypes: {},
  parameters: {
	docs: {
	  description: {
	  component: 'A clickable Icon. Renders a button element.',
	  },
	},
  },
}

const Template = (args) => <ClickableIcon {...args} />

export const Default = Template.bind({})
Default.args = {
	icon: "help"
}

export const Smaller = Template.bind({})
Smaller.args = {
	icon: "help",
	size: "12"
}

export const Larger = Template.bind({})
Larger.args = {
	icon: "help",
	size: "48"
}

export const Green = Template.bind({})
Green.args = {
	icon: "help",
	color: "green"
}