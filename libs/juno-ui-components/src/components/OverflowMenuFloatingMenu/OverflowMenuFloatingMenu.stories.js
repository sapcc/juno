import React from "react"
import { OverflowMenuFloatingMenu} from "./index.js"

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

}