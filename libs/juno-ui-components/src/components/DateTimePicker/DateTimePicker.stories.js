import React from "react"
import { DateTimePicker } from "./index.js"
import { PortalProvider } from "../PortalProvider/PortalProvider.component"

export default {
  title: "WIP/DateTimePicker/DateTimePicker",
  component: DateTimePicker,
  argTypes: {
    mode: {
      options: ["single", "multiple", "range", "time"],
      control: { type: "select" },
    },
    value: {
      control: false,
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
    monthSelectorType: {
      options: ["dropdown", "static"],
      control: { type: "radio" },
    },
    width: {
      options: ["auto", "full"],
      control: { type: "radio" },
    },
  },
}

const Template = ({ ...args }) => <DateTimePicker {...args} />

const PotalTemplate = ({ ...args }) => (
  <div>
    <PortalProvider>
      <DateTimePicker {...args} />
    </PortalProvider>
  </div>
)

export const Default = Template.bind({})
Default.args = {}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "Select a date",
}

export const Required = Template.bind({})
Required.args = {
  label: "Select a date",
  required: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Select a date",
  disabled: true,
}

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  placeholder: "Select a date…",
}

export const WithDefaultDate = Template.bind({})
WithDefaultDate.args = {
  defaultDate: new Date(),
}

export const WithDefaultValue = Template.bind({})
WithDefaultValue.args = {
  defaultValue: new Date(),
}

export const WithTimeAndSeconds = Template.bind({})
WithTimeAndSeconds.args = {
  enableTime: true,
  enableSeconds: true,
  dateFormat: "Y-m-d H:i:S",
}

export const ShowTwoMonths = Template.bind({})
ShowTwoMonths.args = {
  showMonths: 2,
}

export const WithWeekNumbers = Template.bind({})
WithWeekNumbers.args = {
  weekNumbers: true,
}

export const MonthSelectorDropdown = Template.bind({})
MonthSelectorDropdown.args = {
  monthSelectorType: "dropdown",
}

export const AllowInput = Template.bind({})
AllowInput.args = {
  allowInput: true,
}

export const Multiple = Template.bind({})
Multiple.args = {
  mode: "multiple",
}

export const Range = Template.bind({})
Range.args = {
  mode: "range",
}

// BUG: not rendering time-only calendar:
export const TimePicker = Template.bind({})
TimePicker.args = {
  enableTime: true,
  noCalendar: true,
  enableSeconds: true,
  dateFormat: "H:i:S",
}

export const DisableByFunction = Template.bind({})
DisableByFunction.parameters = {
  docs: {
    description: {
      story:
        "Pass an array of functions such as `function(date) {// return true to disable date}` as `disable` to be run for each date in the calendar in order to disable dates that match custom criteria. Pass a locale string or object to modify the sequence of week days rendered in the calendar.",
    },
  },
}
DisableByFunction.args = {
  disable: [
    function (date) {
      return date.getDay() === 0 || date.getDay() === 6
    },
  ],
  locale: {
    firstDayOfWeek: 1, // set week to start on Monday
  },
  helptext:
    "Only work days can be selected, week in calendar starts with Monday.",
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
}

export const WithErrortext = Template.bind({})
WithErrortext.args = {
  errortext: "This DateTimePicker has an error or is invalid.",
}

export const WithSuccesstext = Template.bind({})
WithSuccesstext.args = {
  successtext: "This DateTimePicker was susccessfully validated.",
}

export const WithHelptext = Template.bind({})
WithHelptext.args = {
  helptext: "Some useful information goes here.",
}
