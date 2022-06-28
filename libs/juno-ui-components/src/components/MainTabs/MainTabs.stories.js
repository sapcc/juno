import React from "react"
import { MainTabs } from "./index.js"


export default {
	title: "WiP/MainTabs",
	component: MainTabs,
	argTypes: {}
}

const Template = ({...args}) => (
	<MainTabs {...args}>
	</MainTabs>
)

export const Default = Template.bind({})
Default.args = {
	
}

