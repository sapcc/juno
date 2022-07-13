import React from "react"
import { DataGrid } from "../DataGrid/index.js"
import { DataGridRow } from "../DataGridRow/index.js"
import { DataGridHeadCell } from "./index.js"

export default {
  title: "Components/DataGrid/DataGridHeadCell",
  component: DataGridHeadCell,
  argTypes: {},
  decorators: [
    (story) => (
      <DataGrid columns={3}>
        <DataGridRow>{story()}</DataGridRow>
      </DataGrid>
    ),
  ],
}

const Template = (args) => <DataGridHeadCell {...args}></DataGridHeadCell>

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: "Juno DataGridHeadCell for use in DataGrid",
    },
  },
}
Default.args = {
  children: ["DataGridHeadCell"],
}
