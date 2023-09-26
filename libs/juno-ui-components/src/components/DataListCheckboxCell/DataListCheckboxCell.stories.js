import React from "react"
import { DataListCheckboxCell } from "./index.js"

export default {
  title: "Deprecated/DataList/DataListCheckboxCell",
  component: DataListCheckboxCell,
  argTypes: {
    children: {
      control: false
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "DataList is deprecated and will be removed. Please use DataGrid instead.",
      },
    },
  },
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
