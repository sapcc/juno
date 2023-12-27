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