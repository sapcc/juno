import React from "react"
import { FormSection } from "./index.js"
import { Default as DefaultTextInputGroup } from "../TextInputGroup/TextInputGroup.stories"

export default {
  title: "Design System/Forms/FormSection",
  component: FormSection,
  argTypes: {},
}

const Template = (args) => <FormSection {...args}>
  {args.children.map((child) => (
    <DefaultTextInputGroup {...child} />
  ))}
</FormSection>

export const Default = Template.bind({})
Default.args = {
  children: [DefaultTextInputGroup.args]
}


export const WithTitle = Template.bind({})
WithTitle.args = {
	title: "Form Section With Title",
  children: [DefaultTextInputGroup.args]
}

export const VerticalWithTitle = Template.bind({})
VerticalWithTitle.args = {
  title: "Vertical Form Section With Title",
  children: [DefaultTextInputGroup.args],
  layout: "vertical"
}

