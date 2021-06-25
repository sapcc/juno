import React from "react"
import { Switch } from "./index"

export default {
  title: "Design System/Forms/Switch",
  component: Switch,
  parameters: {
	docs: {
	  description: {
		component: 'The basic switch component. Use for interactions that produce an immediate result when switching between two states/options. IN the context of forms that require to be submitted in order to take effect, use checkboxes instead.',
	  },
	},
  },
}

const Template = (args) => <Switch {...args} />

export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { story: 'Default Switch. Defaults to "off".'}
  },
}
Default.args = {}

export const Small = Template.bind({})
Small.args = {
	size: "small"
}

export const Large = Template.bind({})
Large.args = {
	size: "large"
}

export const Checked = Template.bind({})
Checked.parameters = {
	docs: {
		description: { story: 'Render a checked Switch by passing bool "checked".' }
	}
}
Checked.args = {
	checked: true
}

export const Disabled = Template.bind({})
Disabled.parameters = {
	docs: {
		description: { story: 'Disable a Switch by passing bool "disabled".' }
	}
}
Disabled.args = {
	checked: true,
	disabled: true,
}

