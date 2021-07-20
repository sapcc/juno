import React from "react"
import { Label } from "./index.js"

export default {
  title: "Design System/Forms/Label",
  component: Label,
  argTypes: {},
}

const Template = (args) => (
	<Label {...args}/>
)

export const Default = Template.bind({})
Default.args = {
	text: "My Label",
}