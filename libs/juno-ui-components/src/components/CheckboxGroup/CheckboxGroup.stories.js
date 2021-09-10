import React from "react"
import { CheckboxGroup } from "./index.js"
import { Default as CheckboxRow, Checked as CheckedCheckboxRow } from "../CheckboxRow/CheckboxRow.stories"

export default {
  title: "Design System/Forms/CheckboxGroup",
  component: CheckboxGroup,
  argTypes: {},
}

const Template = ({ ...args }) => 
	<CheckboxGroup {...args} />
	
const row1args = { ...CheckboxRow.args, value: "v1", id: "checkbox1" }
	
const row2args = { ...CheckboxRow.args, value: "v2", checked: true, id: "checkbox2" }

const row3args = { ...CheckboxRow.args, value: "v3", id: "checkbox3"}
		
export const Default = Template.bind({})
Default.args = {
	name: 'my-checkboxgroup',
	children: [<CheckboxRow {...row1args}/>, <CheckboxRow {...row2args} />, <CheckboxRow {...row3args} />]
}

export const WithLabel = Template.bind({})
WithLabel.args = {
	name: 'my-checkboxgroup',
	label: "My Group of Checkboxes",
	children: [<CheckboxRow {...row1args}/>, <CheckboxRow {...row2args} />, <CheckboxRow {...row3args} />]
}

export const Required = Template.bind({})
Required.args = {
	name: 'my-checkboxgroup',
	label: "My Required Group of Checkboxes",
	required: true,
	children: [<CheckboxRow {...row1args}/>, <CheckboxRow {...row2args} />, <CheckboxRow {...row3args} />]
}