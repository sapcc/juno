import React from "react"
import { FormSection } from "./index.js"
import { Default as DefaultTextInputRow } from "../TextInputRow/TextInputRow.stories"

export default {
  title: "Design System/Forms/FormSection",
  component: FormSection,
  argTypes: {},
}

const Template = (args) => <FormSection {...args}>
  {args.children.map((child, i) => (
    <DefaultTextInputRow {...child}  key={`input-${i}`} />
  ))}
</FormSection>

export const Default = Template.bind({})
Default.args = {
  children: [DefaultTextInputRow.args]
}


export const WithTitle = Template.bind({})
WithTitle.args = {
	title: "Form Section With Title",
  children: [DefaultTextInputRow.args]
}



