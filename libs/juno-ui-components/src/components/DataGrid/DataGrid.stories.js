import React from "react"
import { DataGrid } from "./index.js"
import { Default as DataGridRow } from "../DataGridRow/DataGridRow.stories.js"
import { Default as DataGridCell } from "../DataGridCell/DataGridCell.stories.js"
import { Default as DataGridHead } from "../DataGridHead/DataGridHead.stories.js"
import { Default as DataGridHeadRow } from "../DataGridHeadRow/DataGridHeadRow.stories.js"
import { Default as DataGridHeadCell } from "../DataGridHeadCell/DataGridHeadCell.stories.js"
import { Default as DataGridBody } from "../DataGridBody/DataGridBody.stories.js"
import { Default as DataGridFoot } from "../DataGridFoot/DataGridFoot.stories.js"
import { Default as DataGridFootRow } from "../DataGridFootRow/DataGridFootRow.stories.js"
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
	<DataGridHead key="1">
		<DataGridHeadRow>
			<DataGridHeadCell>Head Cell</DataGridHeadCell>
			<DataGridHeadCell sortable>Head Cell</DataGridHeadCell>
			<DataGridHeadCell sortable>Head Cell</DataGridHeadCell>
			<DataGridHeadCell>Head Cell</DataGridHeadCell>
			<DataGridHeadCell>Head Cell</DataGridHeadCell>
		</DataGridHeadRow>
	</DataGridHead>,
	<DataGridBody key="2">
	  	<DataGridRow>
		  <DataGridHeadCell>DataGridCell</DataGridHeadCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		</DataGridRow>
	</DataGridBody>,
	<DataGridFoot key="3">
		<DataGridFootRow>
		  <DataGridHeadCell>DataGridCell</DataGridHeadCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		  <DataGridCell>DataGridCell</DataGridCell>
		</DataGridFootRow>
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
		<DataGridHead key="1">
			<DataGridHeadRow>
				<DataGridCell>Auto DataGrid Cell</DataGridCell>
				<DataGridCell>Auto DataGrid Cell</DataGridCell>
			</DataGridHeadRow>
		</DataGridHead>,
		<DataGridBody key="2">
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
		<DataGridHead key="1">
			<DataGridHeadRow key="1_1">
				<DataGridHeadCell key="1_1_1">Item Title</DataGridHeadCell>
				<DataGridHeadCell key="1_1_2">Item Data 1</DataGridHeadCell>
				<DataGridHeadCell key="1_1_3">Item Data 2</DataGridHeadCell>
				<DataGridHeadCell key="1_1_4">Item Options</DataGridHeadCell>
			</DataGridHeadRow>
		</DataGridHead>,
		<DataGridBody key="2">
			<DataGridRow key="2_1">
				<DataGridCell key="2_1_1">Item Title</DataGridCell>
				<DataGridCell key="2_1_2">Item Data 1</DataGridCell>
				<DataGridCell key="2_1_3">Item Data 2</DataGridCell>
				<DataGridCell key="2_1_4">Item Options</DataGridCell>
			</DataGridRow>
			<DataGridRow key="2_2" selected >
				<DataGridCell key="2_2_1">Selected Item Title</DataGridCell>
				<DataGridCell key="2_2_2">Item Data 1</DataGridCell>
				<DataGridCell key="2_2_3">Item Data 2</DataGridCell>
				<DataGridCell key="2_2_4">Item Options</DataGridCell>
			</DataGridRow>
			<DataGridRow key="2_3" disabled >
				<DataGridCell key="2_3_1">Disabled Item Title</DataGridCell>
				<DataGridCell key="2_3_2">Item Data 1</DataGridCell>
				<DataGridCell key="2_3_3">Item Data 2</DataGridCell>
				<DataGridCell key="2_3_4">Item Options</DataGridCell>
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
		<DataGridHead key="1">
			<DataGridHeadRow key="1_1">
				<DataGridHeadCell key="1_1_1" sortable>Column Title</DataGridHeadCell>
				<DataGridHeadCell key="1_1_2">Column Title</DataGridHeadCell>
				<DataGridHeadCell key="1_1_3">Column Title</DataGridHeadCell>
				<DataGridHeadCell key="1_1_4">Column Title</DataGridHeadCell>
			</DataGridHeadRow>
		</DataGridHead>,
		<DataGridBody key="2">
			<DataGridRow key="2_1">
				<DataGridCell key="2_1_1">Item Title</DataGridCell>
				<DataGridCell key="2_1_2">Item Data 1</DataGridCell>
				<DataGridCell key="2_1_3">Item Data 2</DataGridCell>
				<DataGridCell key="2_1_4">Item Options</DataGridCell>
			</DataGridRow>
			<DataGridRow key="2_2" selected >
				<DataGridCell key="2_2_1">Selected Item Title</DataGridCell>
				<DataGridCell key="2_2_2">Item Data 1</DataGridCell>
				<DataGridCell key="2_2_3">Item Data 2</DataGridCell>
				<DataGridCell key="2_2_4">Item Options</DataGridCell>
			</DataGridRow>
			<DataGridRow key="2_3" disabled >
				<DataGridCell key="2_3_1">Disabled Item Title</DataGridCell>
				<DataGridCell key="2_3_2">Item Data 1</DataGridCell>
				<DataGridCell key="2_3_3">Item Data 2</DataGridCell>
				<DataGridCell key="2_3_4">Item Options</DataGridCell>
			</DataGridRow>
		</DataGridBody>
	]
}

export const FullyFeatured = Template.bind({})
FullyFeatured.parameters = {
	docs: {
		description: {
			story: "Fully Featured DataGrid"
		}
	}
}
FullyFeatured.args = {
	selectable: true,
	showToolbar: true,
	children: [
		<DataGridHead key="1">
			<DataGridHeadRow key="1_1">
				<DataGridHeadCell key="1_1_1">Column 1</DataGridHeadCell>
				<DataGridHeadCell key="1_1_2">Column 2</DataGridHeadCell>
				<DataGridHeadCell key="1_1_3">Column 3</DataGridHeadCell>
			</DataGridHeadRow>
		</DataGridHead>,
		<DataGridBody key="2">
			<DataGridRow key="2_1">
				<DataGridCell key="2_1_1">Item 1</DataGridCell>
				<DataGridCell key="2_1_2">Item 1</DataGridCell>
				<DataGridCell key="2_1_3">Item 1</DataGridCell>
			</DataGridRow>
			<DataGridRow key="2_2">
				<DataGridCell key="2_2_1">Item 2</DataGridCell>
				<DataGridCell key="2_2_2">Item 2</DataGridCell>
				<DataGridCell key="2_2_3">Item 2</DataGridCell>
			</DataGridRow>
		</DataGridBody>,
		<DataGridFoot key="3">
			<DataGridFootRow key="3_1">
				<DataGridCell key="3_1_1">Foot Cell</DataGridCell>
				<DataGridCell key="3_1_2">Foot Cell</DataGridCell>
				<DataGridCell key="3_1_3">Foot Cell</DataGridCell>
			</DataGridFootRow>
		</DataGridFoot>
	]
}


