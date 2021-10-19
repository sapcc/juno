import React from "react"
import { DataGrid } from "./index.js"
import { Default as DataGridRow } from "../DataGridRow/DataGridRow.stories.js"
import { Default as DataGridCell } from "../DataGridCell/DataGridCell.stories.js"
import { Default as DataGridHead } from "../DataGridHead/DataGridHead.stories.js"
import { Default as DataGridHeadCell } from "../DataGridHeadCell/DataGridHeadCell.stories.js"
import { Default as DataGridBody } from "../DataGridBody/DataGridBody.stories.js"
import { Default as DataGridFoot } from "../DataGridFoot/DataGridFoot.stories.js"


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
	<DataGridHead>
		<DataGridRow>
			<DataGridHeadCell>Head Cell</DataGridHeadCell>
			<DataGridHeadCell>Head Cell</DataGridHeadCell>
			<DataGridHeadCell>Head Cell</DataGridHeadCell>
			<DataGridHeadCell>Head Cell</DataGridHeadCell>
			<DataGridHeadCell>Head Cell</DataGridHeadCell>
		</DataGridRow>
	</DataGridHead>,
	<DataGridBody>
	  	<DataGridRow>
		  <DataGridHeadCell>DataGridCell</DataGridHeadCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		</DataGridRow>
	</DataGridBody>,
	<DataGridFoot>
		<DataGridRow>
		  <DataGridHeadCell>DataGridCell</DataGridHeadCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		</DataGridRow>
	</DataGridFoot>
  ]
}

export const Auto = Template.bind({})
Auto.parameters = {
	  docs: {
		description: { 
		  story: "Juno DataGrid set to auto-size."
		}
	  },
	}
Auto.args = {
	auto: true,
	children: [
		<DataGridHead>
			<DataGridRow>
				<DataGridCell>Auto DataGrid Cell</DataGridCell>
				<DataGridCell>Auto DataGrid Cell</DataGridCell>
			</DataGridRow>
		</DataGridHead>,
		<DataGridBody>
			<DataGridRow>
				<DataGridCell>Auto DataGrid Cell</DataGridCell>
				<DataGridCell>Auto DataGrid Cell</DataGridCell>
			</DataGridRow>
		</DataGridBody>
	]
}


