import React from "react"
import { SelectOptionGroup } from "./index.js"
import { SelectOption } from "../SelectOption/index.js"

import { Default as DefaultSelectOption, Disabled as DisabledSelectOption} from "../SelectOption/SelectOption.stories" 

export default {
  title: "Design System/Forms/Select/SelectOptionGroup",
  component: SelectOptionGroup,
  argTypes: {},
}

const Template = ({ options, ...args }) => 
	<SelectOptionGroup {...args}>
		{options.map((option) => (
			<SelectOption {...option} />
		))}
	</SelectOptionGroup>

export const Default = Template.bind({})
Default.args = {
	label: "My option group",
	options: [DefaultSelectOption.args, DisabledSelectOption.args]
}

export const Disabled = Template.bind({})
Disabled.args = {
	label: "My disabled option group",
	options: [DefaultSelectOption.args, DisabledSelectOption.args],
	disabled: true
}