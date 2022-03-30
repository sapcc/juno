import React from "react"
import { DataListCheckboxCell } from "./index.js"

export default {
  title: "Components/DataList/DataListCheckboxCell",
  component: DataListCheckboxCell,
  argTypes: {},
}

const Template = (args) => (
  <DataListCheckboxCell {...args}></DataListCheckboxCell>
)

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: "Juno DataListCheckboxCell for use in DataList",
    },
  },
}
Default.args = {}

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    description: {
      story: "Disabled Juno DataListCheckboxCell for use in DataList",
    },
  },
}
Disabled.args = {
  disabled: true,
}
