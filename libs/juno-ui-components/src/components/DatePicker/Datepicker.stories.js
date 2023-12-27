import React from 'react'
import { Datepicker } from './index.js'

export default {
  title: "WIP/Datepicker/Datepicker",
  component: Datepicker,
  argTypes: {
    mode: {
      options: ["single", "multiple", "range", "time"],
      control: { type: 'select' },
    },
    width: {
      options: ["auto", "full"],
      control: { type: "radio" },
    }
  }
}

const Template = ({...args}) => (
  <Datepicker {...args} /> 
)

export const Default = Template.bind({})
Default.args = {}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "Datepicker Label"
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  label: "Disabled Datepicker"
}

export const Required = Template.bind({})
Required.args = {
  label: "Date is required",
  required: true,
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
}

export const WithHelptext = Template.bind({})
WithHelptext.args = {
  helptext: <>Helptext with a <a href="#">link</a></>
}

export const WithErrortext = Template.bind({})
WithErrortext.args = {
  errortext: "Some error occurred"
}

export const WithSuccesstext = Template.bind({})
WithSuccesstext.args = {
  successtext: "Some success!"
}