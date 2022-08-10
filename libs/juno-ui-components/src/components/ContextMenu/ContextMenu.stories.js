import React from "react"
import { ContextMenu } from "./index.js"
import { MenuItem } from "../MenuItem/"
import { Button } from "../Button/index.js"
import { Default as MenuItemDefaultStory } from "../MenuItem/MenuItem.stories"

export default {
  title: "WiP/ContextMenu/ContextMenu",
  component: ContextMenu,
  argTypes: {},
}

const Template = ({children, ...args}) => (
	<ContextMenu {...args}>
		{children.map((item, i) => (
			<MenuItem {...item} key={`${i}`} />
		))}
	</ContextMenu>
)

export const Default = Template.bind({})
Default.args = {
	children: [
		{ ...MenuItemDefaultStory.args, label: "Juno on Github", href: "https://github.com/sapcc/juno" },
		{ ...MenuItemDefaultStory.args, label: "Item 2" },
		{ ...MenuItemDefaultStory.args, label: "Item 3", icon: "deleteForever" },
		{ ...MenuItemDefaultStory.args, label: null, children: [<Button label="Child" variant="subdued" size="small" className="jn-w-full" />] },
		
	]
}