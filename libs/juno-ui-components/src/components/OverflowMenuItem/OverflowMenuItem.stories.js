import React from "react"
import { OverflowMenuItem } from "./index.js"

export default {
  title: "Design System/OverflowMenu/OverflowMenuItem",
  component: OverflowMenuItem,
  argTypes: {},
}

const Template = (args) => (
	<OverflowMenuItem {...args} >
	</OverflowMenuItem>
)
export const Default = Template.bind({})
Default.args = {

}