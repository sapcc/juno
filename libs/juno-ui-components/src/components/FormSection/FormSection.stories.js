import React from "react"
import { FormSection } from "./index.js"
import { FormRow } from "../FormRow/"
import { TextInput } from "../TextInput/"

export default {
  title: "Forms/FormSection",
  component: FormSection,
  argTypes: {
    items: {
      table: {
        disable: true
      }
    }
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
    <FormRow>
      <TextInput label="Address Line 1" />
    </FormRow>,
    <FormRow>
      <TextInput label="Address Line 2" />
    </FormRow>
  ],
}

export const WithTitle = Template.bind({})
WithTitle.args = {
  title: "Form Section With Title",
  children: [
    <FormRow>
      <TextInput label="Address Line 1" />
    </FormRow>,
    <FormRow>
      <TextInput label="Address Line 2" />
    </FormRow>
  ],
}
