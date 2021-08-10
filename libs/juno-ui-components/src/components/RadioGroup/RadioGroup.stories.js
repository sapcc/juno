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

export const WithLabel = Template.bind({})
WithLabel.args = {
	name: 'my-radiogroup',
	label: "My RadioGroup",
	children: [<RadioRow {...RadioRow.args}/>, <RadioRow {...RadioRow.args}/>]
}

export const Required = Template.bind({})
Required.args = {
	name: 'my-required-radiogroup',
	label: "My Radiogroup – pick one!",
	required: true,
	children: [<RadioRow {...RadioRow.args}/>, <RadioRow {...RadioRow.args}/>]
}


