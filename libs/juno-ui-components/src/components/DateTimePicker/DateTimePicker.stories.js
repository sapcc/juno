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

export const Disabled = Template.bind({})
Disabled.args = {
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
  mode: "time",
}
