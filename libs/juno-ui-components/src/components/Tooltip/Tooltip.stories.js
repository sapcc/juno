import React from "react"
import { Tooltip } from "./index.js"


export default {
  title: "Design System/Tooltip",
  component: Tooltip,
  argTypes: {},
}

const Template = (args) => <Tooltip {...args} />


export const Default = Template.bind({})
Default.args = {
	text: "A default tooltip",
}