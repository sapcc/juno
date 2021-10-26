import React from "react"
import { DataGridBody } from "./index.js"
import { Default as DataGridRow } from "../DataGridRow/DataGridRow.stories.js"
import { Default as DataGridCell } from "../DataGridCell/DataGridCell.stories.js"


export default {
  title: "Design System/DataGrid/DataGridBody",
  component: DataGridBody,
  argTypes: {},
}

const Template = (args) =>
<DataGridBody {...args}>
</DataGridBody>


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { 
	  story: "Juno DataGridBody for use in DataGrid"
	}
  },
}
Default.args = {
  children: [
	  <DataGridRow>
	  <DataGridCell>Data Grid Cell 1</DataGridCell>
	  <DataGridCell>Data Grid Cell 2</DataGridCell>
	  <DataGridCell>Data Grid Cell 3</DataGridCell>
	  <DataGridCell>Data Grid Cell 4</DataGridCell>
	  <DataGridCell>Data Grid Cell 5</DataGridCell>
	</DataGridRow>,
	<DataGridRow>
		<DataGridCell>Data Grid Cell 1</DataGridCell>
		<DataGridCell>Data Grid Cell 2</DataGridCell>
		<DataGridCell>Data Grid Cell 3</DataGridCell>
		<DataGridCell>Data Grid Cell 4</DataGridCell>
		<DataGridCell>Data Grid Cell 5</DataGridCell>
	</DataGridRow>,
	<DataGridRow>
		<DataGridCell>Data Grid Cell 1</DataGridCell>
		<DataGridCell>Data Grid Cell 2</DataGridCell>
		<DataGridCell>Data Grid Cell 3</DataGridCell>
		<DataGridCell>Data Grid Cell 4</DataGridCell>
		<DataGridCell>Data Grid Cell 5</DataGridCell>
	</DataGridRow>
  ]
}

