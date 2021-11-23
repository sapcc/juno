import React from "react"
import { RadioGroup } from "./index.js"
import { RadioRow } from "../RadioRow/"
import { Default as RadioRowStory, Checked as CheckedRadioRowStory } from "../RadioRow/RadioRow.stories"

export default {
  title: "Design System/Forms/RadioGroup",
  component: RadioGroup,
  argTypes: {},
}

const Template = ({ items, ...args }) => (
	<RadioGroup {...args}>
		{items.map((item, i) => (
			<RadioRow {...item} key={`${i}`} />
		))}
	</RadioGroup>
)

export const Default = Template.bind({})
Default.args = {
	name: "default-radiogroup",
	selected: "v-1",
	items: 
		[
			{ ...RadioRowStory.args, label: "Option 1", value: "v-1" },
			{ ...RadioRowStory.args, label: "Option 2", value: "v-2" },
			{ ...RadioRowStory.args, label: "Option 3", value: "v-3" },
		]
}

export const WithLabel = Template.bind({})
WithLabel.args = {
	name: "labelled-radiogroup",
	selected: "v-1",
	label: "Labelled RadioGroup",
	items: 
		[
			{ ...RadioRowStory.args, label: "Option 1", value: "v-1" },
			{ ...RadioRowStory.args, label: "Option 2", value: "v-2" },
			{ ...RadioRowStory.args, label: "Option 3", value: "v-3" },
		]
}

export const Required = Template.bind({})
Required.args = {
	name: "required-radiogroup",
	selected: "v-1",
	label: "Required RadioGroup",
	required: true,
	items: 
		[
			{ ...RadioRowStory.args, label: "Option 1", value: "v-1" },
			{ ...RadioRowStory.args, label: "Option 2", value: "v-2" },
			{ ...RadioRowStory.args, label: "Option 3", value: "v-3" },
		]
}

export const Disabled = Template.bind({})
Disabled.args = {
	name: "disabled-radiogroup",
	selected: "v-1",
	label: "Disabled RadioGroup",
	disabled: true,
	items: 
		[
			{ ...RadioRowStory.args, label: "Option 1", value: "v-1" },
			{ ...RadioRowStory.args, label: "Option 2", value: "v-2" },
			{ ...RadioRowStory.args, label: "Option 3", value: "v-3" },
		]
}



