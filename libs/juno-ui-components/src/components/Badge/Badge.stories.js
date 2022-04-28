import React from "react"
import { Badge } from "./index"

export default {
	title: "Components/Badge",
	component: Badge,
	parameters: {
		docs: {
		  description: {
			component:
			  "A Badge component",
		  },
		},
	  },
}

const Template = (args) => <Badge {...args} />

export const Default = Template.bind({})
Default.parameters = {
	docs: {
		description: {
		  story:
			"A default badge",
		},
	},
}
Default.args = {
	text: "default"
}

export const WithIcon = Template.bind({})
WithIcon.parameters = {
	docs: {
		description: {
		  story:
			"A default badge",
		},
	},
}
WithIcon.args = {
	text: "With Icon",
	icon: true,
}

export const Info = Template.bind({})
Info.parameters = {
	docs: {
		description: {
		  story:
			"An info badge",
		},
	},
}
Info.args = {
	variant: "info",
	text: "info",
}

export const Success = Template.bind({})
Success.parameters = {
	docs: {
		description: {
		  story:
			"A success badge",
		},
	},
}
Success.args = {
	variant: "success",
	text: "success",
}

export const Warning = Template.bind({})
Warning.parameters = {
	docs: {
		description: {
		  story:
			"A warning badge",
		},
	},
}
Warning.args = {
	variant: "warning",
	text: "warning",
}

export const Danger = Template.bind({})
Danger.parameters = {
	docs: {
		description: {
		  story:
			"A danger badge",
		},
	},
}
Danger.args = {
	variant: "danger",
	text: "danger",
}

export const Error = Template.bind({})
Error.parameters = {
	docs: {
		description: {
		  story:
			"An error badge",
		},
	},
}
Error.args = {
	variant: "error",
	text: "error",
}