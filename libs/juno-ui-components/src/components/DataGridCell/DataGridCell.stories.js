import React from "react"
import { DataGrid } from "../DataGrid/index.js"
import { DataGridRow } from "../DataGridRow/index.js"
import { DataGridCell } from "./index.js"

export default {
  title: "Components/DataGrid/DataGridCell",
  component: DataGridCell,
  argTypes: {},
  decorators: [
    (story) => (
      <DataGrid columns={3}>
        <DataGridRow>{story()}</DataGridRow>
      </DataGrid>
    ),
  ],
}

const Template = (args) => <DataGridCell {...args}></DataGridCell>

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: "Juno DataGridCell for use in DataGrid",
    },
  },
}
Default.args = {
  children: ["DataGridCell"],
}
