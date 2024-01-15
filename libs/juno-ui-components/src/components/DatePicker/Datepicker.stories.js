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
    },
    errortext: {
      control: false,
    },
    helptext: {
      control: false,
    },
    successtext: {
      control: false,
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

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  placeholder: "Select a date…"
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

export const WithClearButton = Template.bind({})
WithClearButton.parameters = {
  docs: {
    description: {
      story: "The clear button will only be visible when a date is selected."
    }
  }
}
WithClearButton.args = {
  clear: true,
  value: "2024-01-01"
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

export const WithTime = Template.bind({})
WithTime.args = {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
}

export const WithTimeWithSeconds = Template.bind({})
WithTimeWithSeconds.args = {
  enableTime: true,
  enableSeconds: true,
}

export const With24hTime = Template.bind({})
With24hTime.args = {
  enableTime: true,
  time_24hr: true,
}

export const WithTwoMonths = Template.bind({})
WithTwoMonths.args = {
  showMonths: 2,
}

export const MultipleMode = Template.bind({})
MultipleMode.args = {
  mode: "multiple",
}

export const RangeMode = Template.bind({})
RangeMode.args = {
  mode: "range",
}

export const AllowInput = Template.bind({})
AllowInput.args = {
  allowInput: true,
}

export const WithMinDate = Template.bind({})
WithMinDate.args = {
  minDate: new Date(),
}

export const WithMaxDate = Template.bind({})
WithMaxDate.args = {
  maxDate: new Date(),
}

export const WithWeekNumbers = Template.bind({})
WithWeekNumbers.args = {
  weekNumbers: true,
}

export const WithShorthandCurrentMonth = Template.bind({})
WithShorthandCurrentMonth.args = {
  shorthandCurrentMonth: true,
}
