import React from "react"
import { RadioGroup } from "./index.js"
import { Default as RadioRow, Checked as CheckedRadioRow } from "../RadioRow/RadioRow.stories"

export default {
  title: "Design System/Forms/RadioGroup",
  component: RadioGroup,
  argTypes: {},
}

const Template = ({ ...args }) => 
	<RadioGroup {...args} />
	
const row1args = { ...RadioRow.args, value: "v1", id: "radio1" }
	
const row2args = { ...RadioRow.args, value: "v2", checked: true, id: "radio2" }

const row3args = { ...RadioRow.args, value: "v3", id: "radio3"}
		
export const Default = Template.bind({})

Default.args = {
	name: 'my-radiogroup',
	selected: "v1",
	children: [<RadioRow {...row1args}/>, <RadioRow {...row2args} />, <RadioRow {...row3args} />]
}

export const WithLabel = Template.bind({})
WithLabel.args = {
	name: 'my-radiogroup',
	label: "My RadioGroup",
	children: [<RadioRow {...row1args}/>, <RadioRow {...row2args} />, <RadioRow {...row3args} />]
}

export const Required = Template.bind({})
Required.args = {
	name: 'my-required-radiogroup',
	label: "My Radiogroup – pick one!",
	required: true,
	selected: "v3",
	children: [<RadioRow {...row1args}/>, <RadioRow {...row2args} />, <RadioRow {...row3args} />]
}


