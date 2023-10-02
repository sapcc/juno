import React from "react"
import { FormSection } from "../FormSection/FormSection.component"
import { FormRow } from "../FormRow/FormRow.component"
import { TextInput } from "../TextInput/TextInput.component"

export default {
  title: "Forms/FormSection",
  component: FormSection,
  argTypes: {
    items: {
      table: {
        disable: true
      }
    },
    children: {
      control: false
    },
  }
}

const Template = ({ children, ...args }) => (
  <FormSection {...args}>
    { children }
  </FormSection>
)

export const Default = Template.bind({})
Default.args = {
  children: [
    <FormRow key="1">
      <TextInput label="Address Line 1" />
    </FormRow>,
    <FormRow key="2">
      <TextInput label="Address Line 2" />
    </FormRow>
  ],
}

export const WithTitle = Template.bind({})
WithTitle.args = {
  title: "Form Section With Title",
  children: [
    <FormRow key="1">
      <TextInput label="Address Line 1" />
    </FormRow>,
    <FormRow key="2">
      <TextInput label="Address Line 2" />
    </FormRow>
  ],
}
