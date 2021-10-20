import React from "react"
import { DataGridHeadRow } from "./index.js"
import { Default as DataGridHeadCell } from "../DataGridHeadCell/DataGridHeadCell.stories.js"


export default {
  title: "Design System/DataGrid/DataGridHeadRow",
  component: DataGridHeadRow,
  argTypes: {},
}

const Template = (args) =>
<DataGridHeadRow {...args}>
</DataGridHeadRow>


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { 
	  story: "Juno DataGridHeadRow for use in DataGrid head"
	}
  }
}
Default.args = {
  children: [
  	<DataGridHeadCell>Data Grid Head Cell 1</DataGridHeadCell>,
	<DataGridHeadCell>Data Grid Head Cell 2</DataGridHeadCell>,
	<DataGridHeadCell>Data Grid Head Cell 3</DataGridHeadCell>,
	<DataGridHeadCell>Data Grid Head Cell 4</DataGridHeadCell>,
	<DataGridHeadCell>Data Grid Head Cell 5</DataGridHeadCell>
  ]
}