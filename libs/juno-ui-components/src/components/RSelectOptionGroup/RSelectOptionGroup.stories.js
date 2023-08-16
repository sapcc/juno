import React from "react"
import { RSelect } from "../RSelect/index.js"
import { RSelectOptionGroup } from "./index.js"
import { RSelectOption } from "../RSelectOption/index.js"
import { PortalProvider } from "../PortalProvider/PortalProvider.component.js"

export default {
  title: "Forms/RSelect/RSelectOptionGroup",
  component: RSelectOptionGroup,
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
      <RSelectOptionGroup {...args}>{children}</RSelectOptionGroup>
    </RSelect>
  )
}

export const Default = Template.bind({})
Default.args = {
  children: [
    <RSelectOption value="1" key="1">1</RSelectOption>,
    <RSelectOption value="2" key="2">2</RSelectOption>,
    <RSelectOption value="3" key="3">3</RSelectOption>
  ]
}

export const Labelled = Template.bind({})
Labelled.args = {
  label: "Labelled Group",
  children: [
    <RSelectOption value="1" key="1">1</RSelectOption>,
    <RSelectOption value="2" key="2">2</RSelectOption>,
    <RSelectOption value="3" key="3">3</RSelectOption>
  ]
}