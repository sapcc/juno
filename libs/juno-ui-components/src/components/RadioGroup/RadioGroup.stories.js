import React from "react"
import { RadioGroup } from "./index.js"

import { Default as Radio } from "../Radio/Radio.stories"

export default {
  title: "Design System/RadioGroup",
  component: RadioGroup,
  argTypes: {},
}

const Template = ({ ...args }) => 
	<RadioGroup {...args} />
		

export const Default = Template.bind({})
Default.args = {
	name: 'my-radiogroup',
	children: [<Radio {...Radio.args}/>, <Radio {...Radio.args}/>]
}

