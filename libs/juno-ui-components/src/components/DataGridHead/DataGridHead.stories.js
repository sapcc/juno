import React from "react"
import { DataGridHead } from "./index.js"
import { Default as DataGridHeadRow } from "../DataGridHeadRow/DataGridHeadRow.stories.js"
import { Default as DataGridHeadCell } from "../DataGridHeadCell/DataGridHeadCell.stories.js"


export default {
  title: "Design System/DataGrid/DataGridHead",
  component: DataGridHead,
  argTypes: {},
}

const Template = (args) =>
<DataGridHead {...args}>
</DataGridHead>


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { 
	  story: "Juno DataGridHead for use in DataGrid"
	}
  },
}
Default.args = {
  children: [
    <DataGridHeadRow key="1">
      <DataGridHeadCell key="2">Column 1</DataGridHeadCell>
      <DataGridHeadCell key="3">Column 2</DataGridHeadCell>
      <DataGridHeadCell key="4" sortable>Column 3</DataGridHeadCell>
    </DataGridHeadRow>
  ]
}