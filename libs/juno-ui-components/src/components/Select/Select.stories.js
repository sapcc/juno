import React from "react"
import { Select } from "./index.js"
import { SelectOption } from "../SelectOption/index.js"
import { SelectOptionGroup } from "../SelectOptionGroup/index.js"

import { Default as DefaultSelectOption, Disabled as DisabledSelectOption} from "../SelectOption/SelectOption.stories" 
import { Default as DefaultSelectOptionGroup, Disabled as DisabledSelectOptionGroup} from "../SelectOptionGroup/SelectOptionGroup.stories"

export default {
  	title: "Design System/ Select / Select",
  	component: Select,
  	argTypes: {},
}

const SelectTemplate = ({ options, ...args }) => 
	<Select {...args}> 
		{options.map((option) => (
			<SelectOption {...option} />
		))}
	</Select>
	
const GroupedSelectTemplate = ({ groups, ...args}) =>
	<Select {...args}>
		{groups.map((group) => (
			<SelectOptionGroup {...group} />
		))}
	</Select>

export const SimpleSelect = SelectTemplate.bind({})
SimpleSelect.args = { 
 	name: "Simple-Select",
	options: [DefaultSelectOption.args, DisabledSelectOption.args],
}

export const DisabledSimpleSelect = SelectTemplate.bind({})
DisabledSimpleSelect.args = {
	name: "Disabled-Simple-Select",
	options: [DefaultSelectOption.args, DisabledSelectOption.args],
	disabled: true
}

export const GroupedSelect = GroupedSelectTemplate.bind({})
GroupedSelect.args = {
	name: "Grouped-Select",
	groups: [DefaultSelectOptionGroup.args]
}