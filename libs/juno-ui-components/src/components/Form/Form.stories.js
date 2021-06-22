import React from "react"
import { Form } from "./index.js"
import { FormSection } from "../FormSection/index.js"

export default {
  title: "Design System/Forms/Form",
  component: Form,
  argTypes: {},
}

const Template = (args) => <Form {...args} />

export const Default = Template.bind({})
Default.args = {}


export const WithTitle = Template.bind({})
WithTitle.args = {
	title: "Form Title"
}
