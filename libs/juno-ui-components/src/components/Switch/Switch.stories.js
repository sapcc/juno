import React from "react"
import { Switch } from "./index"

export default {
  title: "Design System/Forms/Switch",
  component: Switch,
  parameters: {
	docs: {
	  description: {
		component: 'The basic switch component.',
	  },
	},
  },
}

const Template = (args) => <Switch {...args} />

export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { story: 'Default switch'}
  },
}

Default.args = {

}

export const Small = Template.bind({})
Small.args = {
	size: "small"
}

export const Large = Template.bind({})
Large.args = {
	size: "large"
}

export const Checked = Template.bind({})
Checked.args = {
	checked: true
}

