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
    disable: {
      control: false,
    },
  },
}

// Not in use yet, useful for "enable" story once we have it, pls leave here:
const daysFromToday = (n) => {
  const today = new Date()
  return new Date(today.setDate(today.getDate() + n))
}

const Template = ({ ...args }) => <DateTimePicker {...args} />

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

export const WithValue = Template.bind({})
WithValue.args = {
  value: new Date(),
}

export const WithDefaultDate = Template.bind({})
WithDefaultDate.args = {
  defaultDate: new Date(),
}

export const WithDefaultDateAndTime = Template.bind({})
WithDefaultDateAndTime.parameters = {
  docs: {
    description: {
      story:
        "Pass `defaultHour` and `defaultMinute` to set default values for the date and time input elements. NOte this willnot set a selected date with these values in the DateTimePicker input element, the user still has to make a selection.",
    },
  },
}
WithDefaultDateAndTime.args = {
  defaultHour: 9,
  defaultMinute: 13,
  enableTime: true,
  dateFormat: "Y-m-d H:i",
}

export const WithDefaultValue = Template.bind({})
WithDefaultValue.args = {
  defaultValue: new Date(),
}

export const WithTime = Template.bind({})
WithTime.args = {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
}

export const WithTimeAndSeconds = Template.bind({})
WithTimeAndSeconds.args = {
  enableTime: true,
  enableSeconds: true,
  dateFormat: "Y-m-d H:i:S",
}

export const WithTimeWithCustomHourIncrement = Template.bind({})
WithTimeWithCustomHourIncrement.args = {
  enableTime: true,
  hourIncrement: 6,
  dateFormat: "Y-m-d H:i",
}

export const WithTimeWithCustomMinuteIncrement = Template.bind({})
WithTimeWithCustomMinuteIncrement.args = {
  enableTime: true,
  minuteIncrement: 1,
  dateFormat: "Y-m-d H:i",
}

export const With24hTime = Template.bind({})
With24hTime.args = {
  enableTime: true,
  time_24hr: true,
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

export const TimePicker = Template.bind({})
TimePicker.args = {
  enableTime: true,
  noCalendar: true,
  enableSeconds: true,
  dateFormat: "H:i:S",
}

export const WithMinDate = Template.bind({})
WithMinDate.args = {
  minDate: new Date(),
  helptext: "Only dates in the future including today can be selected.",
}

export const WithMaxDate = Template.bind({})
WithMaxDate.args = {
  maxDate: new Date(),
  helptext: "Only dates in the past including today can be selected.",
}

export const DisableDate = Template.bind({})
;(DisableDate.parameters = {
  docs: {
    description: {
      story:
        "Pass an array of dates to be disabled, making it impossible for the user to select these dates.",
    },
  },
}),
  (DisableDate.args = {
    disable: [new Date()],
    helptext: "The current date (today) can not be selected.",
  })

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

export const InvalidPreload = Template.bind({})
InvalidPreload.parameters = {
  docs: {
    description: {
      story:
        "Normally, the text input element oif the datepicker would be cleared when passing a date as `value` or `defaultDate` that is disabled from selection. By setting `allowInvalidPreload` such dates can be initially displayed in the datepicker, even though they are not available for user selection in the calendar.",
    },
  },
}
InvalidPreload.args = {
  allowInvalidPreload: true,
  value: "2024-01-30",
  disable: ["2024-01-30"],
  helptext:
    "The datpicker initially shows Jan 30, 2024 as value even though this date has been set as disabled and thus can not be selected by a user.",
}
