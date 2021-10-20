import React from "react"
import { DataGridRow } from "./index.js"
import { Default as DataGridCell } from "../DataGridCell/DataGridCell.stories.js"


export default {
  title: "Design System/DataGrid/DataGridRow",
  component: DataGridRow,
  argTypes: {},
}

const Template = (args) =>
<DataGridRow {...args}>
</DataGridRow>


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { 
	  story: "Juno DataGridRow for use in DataGrid"
	}
  },
}
Default.args = {
  children: [
  	<DataGridCell>Data Grid Cell 1</DataGridCell>,
	  <DataGridCell>Data Grid Cell 2</DataGridCell>,
	  <DataGridCell>Data Grid Cell 3</DataGridCell>,
	  <DataGridCell>Data Grid Cell 4</DataGridCell>,
	  <DataGridCell>Data Grid Cell 5</DataGridCell>
  ]
}
