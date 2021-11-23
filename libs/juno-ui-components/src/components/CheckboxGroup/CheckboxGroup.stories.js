import React from "react"
import { CheckboxGroup } from "./index.js"
import { CheckboxRow } from "../CheckboxRow/index.js"
// import CheckboxRow stories:
import { Default as CheckboxRowStory } from "../CheckboxRow/CheckboxRow.stories"

export default {
  title: "Design System/Forms/CheckboxGroup",
  component: CheckboxGroup,
  argTypes: {},
}

const Template = ({ items, ...args }) => (
	  <CheckboxGroup {...args}>
		{items.map((item) => (
		  <CheckboxRow {...item} />
		))}
	  </CheckboxGroup>
	)


export const Default = Template.bind({})
Default.args = {
	name: "Default ChechboxGroup",
	items: [
		{ ...CheckboxRowStory.args, value: "val-1" , id: "checkbox-1", key: "1" },
		{ ...CheckboxRowStory.args, value: "val-2" , id: "checkbox-2", key: "2" },
		{ ...CheckboxRowStory.args, value: "val-3" , id: "checkbox-3", key: "3"}
	]
}

export const WithLabel = Template.bind({})
WithLabel.args = {
	name: "Labelled ChechboxGroup",
	label: "A Labelled CheckboxGroup",
	items: [
		{ ...CheckboxRowStory.args, value: "val-l-1" , id: "checkbox-l-4", key: "l-1" },
		{ ...CheckboxRowStory.args, value: "val-l-2" , id: "checkbox-l-5", key: "l-2" },
		{ ...CheckboxRowStory.args, value: "val-l-3" , id: "checkbox-l-6", key: "l-3"}
	]
}

export const Required = Template.bind({})
Required.args = {
	name: "Required Labelled ChechboxGroup",
	label: "A Required, Labelled CheckboxGroup",
	required: true,
	items: [
		{ ...CheckboxRowStory.args, value: "val-r-1" , id: "checkbox-r-4", key: "r-1" },
		{ ...CheckboxRowStory.args, value: "val-r-2" , id: "checkbox-r-5", key: "r-2" },
		{ ...CheckboxRowStory.args, value: "val-r-3" , id: "checkbox-r-6", key: "r-3"}
	]
}
	