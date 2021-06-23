import React from "react"
import { Form } from "./index.js"
import { Default as DefaultTextInputGroup } from "../TextInputGroup/TextInputGroup.stories"

export default {
  title: "Design System/Forms/Form",
  component: Form,
  argTypes: {},
}

const Template = (args) => (
  <Form {...args}> 
    {args.children.map((child) => (
      <DefaultTextInputGroup {...child} />
    ))}
  </Form>
)

export const Default = Template.bind({})
Default.args = {
  children: [DefaultTextInputGroup.args]
}


export const WithTitle = Template.bind({})
WithTitle.args = {
	title: "Form Title",
  children: [DefaultTextInputGroup.args],
}

export const VerticalWithTitle = Template.bind({})
VerticalWithTitle.args = {
  title: "Vertical Form Title",
  children: [DefaultTextInputGroup.args],
  layout: "vertical"
}



