import React from "react"
import { LoadingIndicator } from "./index.js"

export default {
  title: "Components/LoadingIndicator",
  component: LoadingIndicator,
  argTypes: {},
  parameters: {
	docs: {
	  description: {
		component:
		  "A specific, CCloud-branded loading indicator. For more generic use cases use Spinner instead.",
	  },
	},
  },
}

const Template = (args) => <LoadingIndicator {...args} />

export const Default = Template.bind({})
Default.args = {

}