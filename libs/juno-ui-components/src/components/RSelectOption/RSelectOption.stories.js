import React from "react"
import { RSelect } from "../RSelect/index.js"
import { RSelectOption } from "./index.js"
import { PortalProvider } from "../PortalProvider/PortalProvider.component.js"

export default {
  title: "Forms/RSelect/RSelectOption",
  component: RSelectOption,
  argTypes: {},
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
    <RSelect open>
      <RSelectOption {...args}>{children}</RSelectOption>
    </RSelect>
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