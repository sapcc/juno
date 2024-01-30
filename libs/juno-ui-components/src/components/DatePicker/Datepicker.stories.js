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
    value: {
      control: false,
    },
    monthSelectorType: {
      options: ["dropdown", "static"],
      control: { type: "radio" },
    },
    options: {
      control: false,
    },
  }
}

const Template = ({...args}) => (
  <Datepicker {...args} /> 
)


const daysFromToday = (n) => {
  const today = new Date()
  return new Date(today.setDate(today.getDate() + n ))
}

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
  dateFormat: "Y-m-d H:i:S",
}

export const WithTimeWithCustomHourIncrement = Template.bind({})
WithTimeWithCustomHourIncrement.args = {
  enableTime: true,
  hourIncrement: 6,
  dateFormat: "Y-m-d H:i",
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

export const MultipleModeWithCustomConjunction = Template.bind({})
MultipleModeWithCustomConjunction.args = {
  mode: "multiple",
  conjunction: " || ",
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
  minDate: "today",
}

export const WithMaxDate = Template.bind({})
WithMaxDate.args = {
  maxDate: "today",
}

export const WithWeekNumbers = Template.bind({})
WithWeekNumbers.parameters = {
  docs: {
    description: {
      story: "Set `weekNumbers` to `true` to display week numbers in the calendar."
    }
  }
}
WithWeekNumbers.args = {
  weekNumbers: true,
}

export const WithShorthandCurrentMonth = Template.bind({})
WithShorthandCurrentMonth.parameters = {
  docs: {
    description: {
      story: "Set `shorthandCurrentMonth` to `true` to show shorthand month names, e.g. 'Jan' instead of 'January'."
    }
  }
}
WithShorthandCurrentMonth.args = {
  shorthandCurrentMonth: true,
}

export const WithStaticMonthSelector = Template.bind({})
WithStaticMonthSelector.parameters = {
  docs: {
    description: {
      story: "Set `monthSelectorType` to `\"static\"` to not show a dropdown/select element to navigate months. Default is `\"dropdown\"`. "
    }
  }
}
WithStaticMonthSelector.args = {
  monthSelectorType: "static",
}

export const StaticPosition = Template.bind({})
StaticPosition.parameters = {
  docs: {
    description: {
      story: "Set to `true` to render the calendar inside the component wrapper, right next/after the input element."
    }
  }
}
StaticPosition.args = {
  staticPosition: true,
}

export const WithValueAsDateObject = Template.bind({})
WithValueAsDateObject.parameters = {
  docs: {
    description: {
      story: "Pass a JS date object as `value`."
    }
  }
}
WithValueAsDateObject.args = {
  value: new Date()
}

export const WithValueAsDateString = Template.bind({})
WithValueAsDateString.parameters = {
  docs: {
    description: {
      story: "Pass a string as a `value` that is compatible with the current `dateFormat` prop, e.g. `\"2024-01-24\"` if the current `dateFormat` is `\"Y-m-d\"` (as is the default). The Datepicker component will not convert these."
    }
  }
}
WithValueAsDateString.args = {
  value: "2024-01-24"
}

export const WithValueAsIsoDateString = Template.bind({})
WithValueAsIsoDateString.parameters = {
  docs: {
    description: {
      story: "Pass an ISO-compatible date string to display the corresponding date in the Datepicker."
    }
  }
}
WithValueAsIsoDateString.args = {
  value: "2034-02-26T19:40:03.243Z"
}

export const WithValueAsTimestamp = Template.bind({})
WithValueAsTimestamp.parameters = {
  docs: {
    description: {
      story: "Pass a timestamp with milliseconds as `value` to display the corresponding date in the Datepicker."
    }
  }
}
WithValueAsTimestamp.args = {
  value: 1706273787000
}

export const WithValueAsTodayShortcut = Template.bind({})
WithValueAsTodayShortcut.parameters = {
  docs: {
    description: {
      story: "Pass `\"today\"` as `value` as a shortcut to display the current Date in the Datepicker."
    }
  }
}
WithValueAsTodayShortcut.args = {
  value: "today"
}

export const WithDefaultDate = Template.bind({})
WithDefaultDate.parameters = {
  docs: {
    description: {
      story: "Pass a `defaultDate` instead of `value`. "
    }
  }
}
WithDefaultDate.args = {
  defaultDate: "2024-01-30"
}

export const WithDefaultDateAndTime = Template.bind({})
WithDefaultDateAndTime.parameters = {
  docs: {
    description: {
      story: "Pass `defaultHour` and `defaultMinute` to set default values for the date and time elements. "
    }
  }
}
WithDefaultDateAndTime.args = {
  defaultHour: 9,
  defaultMinute: 13,
  enableTime: true,
  dateFormat: "Y-m-d H:i",
}

export const EnableDate = Template.bind({})
EnableDate.parameters = {
  docs: {
    description: {
      story: "Pass an array of dates to be enabled, making it impossible for the user to select any other dates."
    }
  }
}
EnableDate.args = {
  enable: [ new Date() ],
  helptext: "Only the current date can be selected"
}

export const EnableDateRange = Template.bind({})
EnableDateRange.parameters = {
  docs: {
    description: {
      story: "Pass an array of objects with a `from` and a `to` key each, making it impossible for the user to select any date outside the specified ranges."
    }
  }
}
EnableDateRange.args = {
  enable: [
    {
      from: new Date(),
      to: daysFromToday(7),
    }
  ],
  helptext: "Only the current date and the next six days can be selected",
}

export const DisableDate = Template.bind({})
DisableDate.parameters = {
  docs: {
    description: {
      story: "Pass an array of dates to be disabled, making it impossible for the user to select these dates."
    }
  }
},
DisableDate.args = {
  disable: [ new Date() ],
  helptext: "The current date can not be selected",
}

export const DisableByFunction = Template.bind({})
DisableByFunction.parameters = {
  docs: {
    description: {
      story: "Pass an array of functions such as `function(date) {// return true to disable date}` as `disable` to be run for each date in the calendar in order to disable dates that match custom criteria."
    }
  }
}
DisableByFunction.args = {
  disable: [
    function(date) {
      return (date.getDay() === 0 || date.getDay() === 6)
    }
  ],
  locale: {
    firstDayOfWeek: 1, // set week to start on Monday
  },
  helptext: "Only work days can be selected",
}

export const CustomAriaDateFormat = Template.bind({})
CustomAriaDateFormat.parameters = {
  docs: {
    description: {
      story: "A custom `ariaDateFormat` can be passed to set the format for the aria-label property of each day in the calendar. This will be used by screenreaders, so make sure it makes sense and contains all necessary information so a user can sensibly choose a date based on the format. This example sets a weekday, full month, day, and year."
    }
  }
}
CustomAriaDateFormat.args = {
  helptext: "👉 Open the calendar and inspect the aria-label property of a day to see the result!",
  ariaDateFormat: "l, F j, Y"
}
