import React from "react"
import { RadioGroup } from "./index.js"
import { Default as RadioRow } from "../RadioRow/RadioRow.stories"

export default {
  title: "Design System/Forms/RadioGroup",
  component: RadioGroup,
  argTypes: {},
}

const Template = ({ ...args }) => 
	<RadioGroup {...args} />
		

export const Default = Template.bind({})
Default.args = {
	name: 'my-radiogroup',
	children: [<RadioRow {...RadioRow.args}/>, <RadioRow {...RadioRow.args}/>]
}
