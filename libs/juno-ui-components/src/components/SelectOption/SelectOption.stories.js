import React from "react"
import { Select } from "../Select/Select.component"
import { SelectOption } from "./SelectOption.component"
import { PortalProvider } from "../PortalProvider/PortalProvider.component.js"

export default {
  title: "Forms/Select/SelectOption",
  component: SelectOption,
  argTypes: {
    children: {
      control: false
    },
  },
  decorators: [
    (story) => (
      <PortalProvider>
        {story()}
      </PortalProvider>
    ),
  ],
}

const Template = (args) => {
  return (
    <Select open>
      <SelectOption {...args} />
    </Select>
  )
}

export const Default = Template.bind({})
Default.args = {
  value: "Option 1"
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  value: "Disabled Option"
}

export const ChildrenOnly = Template.bind({})
ChildrenOnly.args = {
  children: [
    "Option 1"
  ]
}