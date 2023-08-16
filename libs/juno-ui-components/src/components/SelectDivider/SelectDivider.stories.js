import React from "react"
import { SelectDivider } from "./index.js"
import { RSelect } from "../RSelect/index.js"
import { RSelectOption } from "../RSelectOption/index.js"
import { PortalProvider } from "../PortalProvider/PortalProvider.component.js"

export default {
  title: "Forms/RSelect/SelectDivider",
  component: SelectDivider,
  argTypes: {},
  decorators: [
    (story) => (
      <PortalProvider>
        {story()}
      </PortalProvider>
    ),
  ],
}

const Template = () => {
  return (
    <RSelect open>
      <RSelectOption value="1">1</RSelectOption>
      <SelectDivider />
      <RSelectOption value="3">3</RSelectOption>
    </RSelect>
  )
}

export const Default = Template.bind({})
Default.args = {}

