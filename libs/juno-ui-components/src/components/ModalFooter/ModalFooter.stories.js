import React from "react"
import { ModalFooter } from "./index.js"
import { Button } from "../Button/index.js"
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
  argTypes: {},
}

export const Default = Template.bind({})
Default.args = {
	onClose: () => { console.log("Close!")},
}

export const Configure = Template.bind({})
Configure.args = {
	confirmButtonLabel: "Confirm Action",
	cancelButtonLabel: "Cancel Action",
	onConfirm: () => { console.log("Confirm!")},
	onCancel: () => { console.log("Cancel!")},
	onClose: () => { console.log("Close!")},
}

export const Custom = Template.bind({})
Custom.args = {
	className: "jn-justify-between jn-items-center",
	children: [

			<div className="jn-flex jn-flex-row jn-gap-2 jn-self-start jn-mt-2">
				<Icon />
				<span>Some status here</span>
			</div>,
			<div className="jn-flex jn-flex-row jn-gap-3.5 jn-self-end">
				<Button variant="primary-danger" label="Destruction" onClick={()=>{console.log("Custom Click Destroy")}} key="b-1"/>
				<Button variant="primary" label="World Peace" onClick={()=>{console.log("Custom Click Peace")}} key="b-2"/>
				<Button label="Surprise Me!" onClick={()=>{console.log("Custom Click Surprise")}} key="b-3"/>
			</div>

	]
}