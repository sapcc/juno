import React from "react"
import { OverflowMenuFloatingMenu} from "./index.js"
import { Default as OverflowMenuItem } from "../OverflowMenuItem/OverflowMenuItem.stories.js"

export default {
  title: "Design System/OverflowMenu/OverflowMenuFloatingMenu",
  component: OverflowMenuFloatingMenu,
  argTypes: {},
}

const Template = (args) => (
	<OverflowMenuFloatingMenu {...args} >
	</OverflowMenuFloatingMenu>
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