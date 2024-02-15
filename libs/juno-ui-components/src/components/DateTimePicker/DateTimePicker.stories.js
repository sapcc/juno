import React from "react"
import { DateTimePicker } from "./index.js"
import { PortalProvider } from "../PortalProvider/PortalProvider.component"

export default {
  title: "WIP/DateTimePicker/DateTimePicker",
  component: DateTimePicker,
  argTypes: {},
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

export const AllowInput = Template.bind({})
AllowInput.args = {
  allowInput: true,
}
