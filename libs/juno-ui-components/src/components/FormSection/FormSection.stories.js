import React from "react"
import { FormSection } from "./index.js"
import { TextInputRow } from "../TextInputRow/"
import { Default as DefaultTextInputRowStory } from "../TextInputRow/TextInputRow.stories"

export default {
  title: "Design System/Forms/FormSection",
  component: FormSection,
  argTypes: {},
}

const Template = ({ items, ...args }) => (
  <FormSection {...args}>
    {items.map((item, i) => (
      <TextInputRow {...item}  key={`input-${i}`} />
    ))}
  </FormSection>
)

export const Default = Template.bind({})
Default.args = {
  items: 
    [
      { ...DefaultTextInputRowStory.args, label: "Address 1", id: "d-1" },
      { ...DefaultTextInputRowStory.args, label: "Address 2", id: "d-2" }
    ]
}


export const WithTitle = Template.bind({})
WithTitle.args = {
	title: "Form Section With Title",
  items: 
  [
    { ...DefaultTextInputRowStory.args, label: "Address 1", id: "wt-1" },
    { ...DefaultTextInputRowStory.args, label: "Address 2", id: "wt-2" }
  ]
}



