import React from "react"
import { DataGrid } from "./index.js"
import { Default as DataGridRow } from "../DataGridRow/DataGridRow.stories.js"
import { Default as DataGridCell } from "../DataGridCell/DataGridCell.stories.js"


export default {
  title: "Design System/DataGrid/DataGrid",
  component: DataGrid,
  argTypes: {},
}

const Template = (args) =>
<DataGrid {...args}>
</DataGrid>


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { 
	  story: "Juno DataGrid for displaying data"
	}
  },
}
Default.args = {
  children: [
  	<DataGridRow>
	  <DataGridCell>DataGridCell</DataGridCell>
	</DataGridRow>
  ]
}

