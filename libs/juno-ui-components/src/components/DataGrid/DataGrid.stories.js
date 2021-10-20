import React from "react"
import { DataGrid } from "./index.js"
import { Default as DataGridRow } from "../DataGridRow/DataGridRow.stories.js"
import { Default as DataGridCell } from "../DataGridCell/DataGridCell.stories.js"
import { Default as DataGridHead } from "../DataGridHead/DataGridHead.stories.js"
import { Default as DataGridHeadCell } from "../DataGridHeadCell/DataGridHeadCell.stories.js"
import { Default as DataGridBody } from "../DataGridBody/DataGridBody.stories.js"
import { Default as DataGridFoot } from "../DataGridFoot/DataGridFoot.stories.js"
import { Default as DataGridToolbar } from "../DataGridToolbar/DataGridToolbar.stories.js"


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
			<DataGridHeadCell sortable>Head Cell</DataGridHeadCell>
			<DataGridHeadCell sortable>Head Cell</DataGridHeadCell>
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

export const Selectable = Template.bind({})
Selectable.parameters = {
	docs: {
		description: {
			story: "Juno DataGrid with selectable items/rows"
		}
	}
}
Selectable.args = {
	selectable: true,
	children: [
		<DataGridBody>
			<DataGridRow>
				<DataGridCell>Item Title</DataGridCell>
				<DataGridCell>Item Data 1</DataGridCell>
				<DataGridCell>Item Data 2</DataGridCell>
				<DataGridCell>Item Options</DataGridCell>
			</DataGridRow>
			<DataGridRow selected >
				<DataGridCell>Selected Item Title</DataGridCell>
				<DataGridCell>Item Data 1</DataGridCell>
				<DataGridCell>Item Data 2</DataGridCell>
				<DataGridCell>Item Options</DataGridCell>
			</DataGridRow>
			<DataGridRow disabled >
				<DataGridCell>Disabled Item Title</DataGridCell>
				<DataGridCell>Item Data 1</DataGridCell>
				<DataGridCell>Item Data 2</DataGridCell>
				<DataGridCell>Item Options</DataGridCell>
			</DataGridRow>
		</DataGridBody>
	]
}

export const WithToolbar = Template.bind({})
WithToolbar.parameters = {
	docs: {
		description: {
			story: "Juno Datagrid with Toolbar"
		}
	}
}
WithToolbar.args = {
	showToolbar: true,
	children: [
		<DataGridHead>
			<DataGridRow>
				<DataGridHeadCell sortable>Column Title</DataGridHeadCell>
				<DataGridHeadCell>Column Title</DataGridHeadCell>
				<DataGridHeadCell>Column Title</DataGridHeadCell>
				<DataGridHeadCell>Column Title</DataGridHeadCell>
			</DataGridRow>
		</DataGridHead>,
		<DataGridBody>
			<DataGridRow>
				<DataGridCell>Item Title</DataGridCell>
				<DataGridCell>Item Data 1</DataGridCell>
				<DataGridCell>Item Data 2</DataGridCell>
				<DataGridCell>Item Options</DataGridCell>
			</DataGridRow>
			<DataGridRow selected >
				<DataGridCell>Selected Item Title</DataGridCell>
				<DataGridCell>Item Data 1</DataGridCell>
				<DataGridCell>Item Data 2</DataGridCell>
				<DataGridCell>Item Options</DataGridCell>
			</DataGridRow>
			<DataGridRow disabled >
				<DataGridCell>Disabled Item Title</DataGridCell>
				<DataGridCell>Item Data 1</DataGridCell>
				<DataGridCell>Item Data 2</DataGridCell>
				<DataGridCell>Item Options</DataGridCell>
			</DataGridRow>
		</DataGridBody>
	]
}


