import React from "react"
import { FormSection } from "./index.js"

export default {
  title: "Design System/Forms/FormSection",
  component: FormSection,
  argTypes: {},
}

const Template = (args) => <FormSection {...args} />

export const Default = Template.bind({})
Default.args = {}


export const WithTitle = Template.bind({})
WithTitle.args = {
	title: "Form Section Title"
}
