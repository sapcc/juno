import React from "react"
import { ContextMenu } from "./index.js"
import { ContextMenuItem } from "../ContextMenuItem/"
import { Default as ContextMenuItemDefaultStory } from "../ContextMenuItem/ContextMenuItem.stories"

export default {
  title: "WiP/ContextMenu/ContextMenu",
  component: ContextMenu,
  argTypes: {},
}

const Template = ({children, ...args}) => (
	<ContextMenu {...args}>
		{children.map((item, i) => (
			<ContextMenuItem {...item} key={`${i}`} />
		))}
	</ContextMenu>
)

export const Default = Template.bind({})
Default.args = {
	children: [
		{ ...ContextMenuItemDefaultStory.args, label: "Juno on Github", href: "https://github.com/sapcc/juno" },
		{ ...ContextMenuItemDefaultStory.args, label: "Item 2" },
		{ ...ContextMenuItemDefaultStory.args, label: "Item 3", icon: "deleteForever" },
	]
}