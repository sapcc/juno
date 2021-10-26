import React from "react"
import { Form } from "./index.js"
import { Default as DefaultTextInputRow } from "../TextInputRow/TextInputRow.stories"

export default {
  title: "Design System/Forms/Form",
  component: Form,
  argTypes: {},
}

const Template = (args) => (
  <Form {...args}> 
    {args.children.map((child,i) => (
      <DefaultTextInputRow {...child} key={`input-${i}`} />
    ))}
  </Form>
)

export const Default = Template.bind({})
Default.args = {
  children: [DefaultTextInputRow.args]
}


export const WithTitle = Template.bind({})
WithTitle.args = {
	title: "Form Title",
  children: [DefaultTextInputRow.args],
}



