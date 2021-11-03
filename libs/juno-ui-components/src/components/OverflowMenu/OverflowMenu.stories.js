import React from "react"
import { OverflowMenu } from "./index.js"
import { Default as OverflowMenuItem } from "../OverflowMenuItem/OverflowMenuItem.stories.js"

export default {
  title: "Design System/OverflowMenu/OverflowMenu",
  component: OverflowMenu,
  argTypes: {},
  parameters: {
	docs: {
	  description: {
	  component: 'An Overflow Menu to be used for user options when space is limited.',
	  },
	},
  },
}

const Template = (args) => (
	<OverflowMenu {...args}>
	</OverflowMenu>
)

export const Default = Template.bind({})
Default.args = {
	children: [
		<OverflowMenuItem key="1">Item 1</OverflowMenuItem>,
		<OverflowMenuItem key="1">Item 2</OverflowMenuItem>,
		<OverflowMenuItem key="1">Item 3</OverflowMenuItem>,
		<OverflowMenuItem key="1">Item 4</OverflowMenuItem>
	]
}