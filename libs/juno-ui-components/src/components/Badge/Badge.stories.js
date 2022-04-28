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