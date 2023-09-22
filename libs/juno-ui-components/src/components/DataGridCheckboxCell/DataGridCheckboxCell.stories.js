import React from "react"
import { DataGrid } from "../DataGrid/index.js"
import { DataGridRow } from "../DataGridRow/index.js"
import { DataGridCheckboxCell } from "./index.js"

export default {
  title: "WiP/DataGrid/DataGridCheckboxCell",
  component: DataGridCheckboxCell,
  argTypes: {
    children: {
      control: false
    },
  },
  decorators: [
    (story) => (
      <DataGrid columns={3}>
        <DataGridRow>{story()}</DataGridRow>
      </DataGrid>
    ),
  ],
  parameters: {
    docs: {
      source: {
        excludeDecorators: false,
      },
    },
  }
}

const Template = (args) => (
  <DataGridCheckboxCell {...args}></DataGridCheckboxCell>
)

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: "Juno DataGridCheckboxCell for use in DataGrid",
    },
  },
}
Default.args = {}

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    description: {
      story: "Disabled Juno DataGridCheckboxCell for use in DataGrid",
    },
  },
}
Disabled.args = {
  disabled: true,
}
