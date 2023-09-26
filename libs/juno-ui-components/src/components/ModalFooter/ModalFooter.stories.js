import React from "react"
import { ModalFooter } from "./index.js"
import { Button } from "../Button/index.js"
import { ButtonRow } from "../ButtonRow/index.js"
import { Stack } from "../Stack/index.js"
import { Icon } from "../Icon/index.js"

const Template = (args) => {
  return (
	<ModalFooter {...args} >
	</ModalFooter>
  )
}
 
export default {
  title: "WiP/Modal/ModalFooter",
  component: ModalFooter,
  argTypes: {
		children: {
      control: false
    },
	},
	parameters: { actions: { argTypesRegex: null } },
}

export const Default = Template.bind({})
Default.args = {}

export const Configure = Template.bind({})
Configure.args = {
	confirmButtonLabel: "Confirm Action",
	cancelButtonLabel: "Cancel Action",
}

export const Custom = Template.bind({})
Custom.args = {
	className: "jn-justify-between jn-items-center",
	children: [
		<Stack gap="2">
			<Icon />
			<span>Some status here</span>
		</Stack>,
		<ButtonRow>
			<Button variant="primary-danger" label="Destruction"  key="b-1"/>
			<Button variant="primary" label="World Peace"  key="b-2"/>
			<Button variant="subdued" label="Surprise Me!" key="b-3"/>
		</ButtonRow>
	]
}