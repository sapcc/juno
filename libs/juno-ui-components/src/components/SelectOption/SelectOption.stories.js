import React from "react"
import { Select } from "../Select/index.js"
import { SelectOption } from "./index.js"
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

const Template = ({children, ...args}) => {
  return (
    <Select open>
      <SelectOption {...args}>{children}</SelectOption>
    </Select>
  )
}

export const Default = Template.bind({})
Default.args = {
  value: "option",
  label: "Option"
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  value: "disabled-option",
  children: "Disabled Option"
}