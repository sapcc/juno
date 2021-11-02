import React from "react"
import { OverflowMenu } from "./index.js"

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

}