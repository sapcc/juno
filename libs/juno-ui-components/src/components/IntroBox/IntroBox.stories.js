import React from "react"
import { IntroBox } from "./index.js"

export default {
  title: "Design System/IntroBox",
  component: IntroBox,
  argTypes: {},
}

const Template = (args) => <IntroBox {...args} />

export const Default = Template.bind({})
Default.args = {
	text: "Default IntroBox."
}

export const WithTitle = Template.bind({})
WithTitle.args = {
	title: "IntroBox",
	text: "IntroBox with title."
}

export const Warning = Template.bind({})
Warning.args = {
	variant: "warning",
	text: "Warning IntroBox."
}

export const Danger = Template.bind({})
Danger.args = {
	variant: "danger",
	text: "Danger IntroBox."
}



