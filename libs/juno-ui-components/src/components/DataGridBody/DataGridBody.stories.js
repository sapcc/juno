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
	  <DataGridRow key="1">
	  <DataGridCell key="1_1">Data Grid Cell 1</DataGridCell>
	  <DataGridCell key="1_2">Data Grid Cell 2</DataGridCell>
	  <DataGridCell key="1_3">Data Grid Cell 3</DataGridCell>
	  <DataGridCell key="1_4">Data Grid Cell 4</DataGridCell>
	  <DataGridCell key="1_5">Data Grid Cell 5</DataGridCell>
	</DataGridRow>,
	<DataGridRow key="2">
		<DataGridCell key="2_1">Data Grid Cell 1</DataGridCell>
		<DataGridCell key="2_2">Data Grid Cell 2</DataGridCell>
		<DataGridCell key="2_3">Data Grid Cell 3</DataGridCell>
		<DataGridCell key="2_4">Data Grid Cell 4</DataGridCell>
		<DataGridCell key="2_5">Data Grid Cell 5</DataGridCell>
	</DataGridRow>,
	<DataGridRow key="3">
		<DataGridCell key="3_1">Data Grid Cell 1</DataGridCell>
		<DataGridCell key="3_2">Data Grid Cell 2</DataGridCell>
		<DataGridCell key="3_3">Data Grid Cell 3</DataGridCell>
		<DataGridCell key="3_4">Data Grid Cell 4</DataGridCell>
		<DataGridCell key="3_5">Data Grid Cell 5</DataGridCell>
	</DataGridRow>
  ]
}

