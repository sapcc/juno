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

export const WithDefaultIcon = Template.bind({})
WithDefaultIcon.parameters = {
	docs: {
		description: {
		  story:
			"A default badge",
		},
	},
}
WithDefaultIcon.args = {
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

export const InfoWithIcon = Template.bind({})
InfoWithIcon.parameters = {
	docs: {
		description: {
		  story:
			"An info badge",
		},
	},
}
InfoWithIcon.args = {
	variant: "info",
	text: "info",
	icon: true,
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

export const SuccessWithIcon = Template.bind({})
SuccessWithIcon.parameters = {
	docs: {
		description: {
		  story:
			"A success badge",
		},
	},
}
SuccessWithIcon.args = {
	variant: "success",
	text: "success",
	icon: true,
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

export const WarningWithIcon = Template.bind({})
WarningWithIcon.parameters = {
	docs: {
		description: {
		  story:
			"A warning badge",
		},
	},
}
WarningWithIcon.args = {
	variant: "warning",
	text: "warning",
	icon: true,
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

export const DangerWithIcon = Template.bind({})
DangerWithIcon.parameters = {
	docs: {
		description: {
		  story:
			"A danger badge",
		},
	},
}
DangerWithIcon.args = {
	variant: "danger",
	text: "danger",
	icon: true,
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

export const ErrorWithIcon = Template.bind({})
ErrorWithIcon.parameters = {
	docs: {
		description: {
		  story:
			"An error badge",
		},
	},
}
ErrorWithIcon.args = {
	variant: "error",
	text: "error",
	icon: true,
}

export const DefaultWithAnyIcon = Template.bind({})
DefaultWithAnyIcon.parameters = {
	docs: {
		description: {
			story: 
				""
		}
	}
}
DefaultWithAnyIcon.args = {
	text: "deleted",
	icon: "deleteForever"
}
