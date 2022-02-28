import React from "react"
import { DataGrid } from "./index.js"
import { DataGridBody } from "../DataGridBody/index.js"
import { DataGridRow } from "../DataGridRow/index.js"
import { DataGridCell } from "../DataGridCell/index.js"
import { DataGridCheckboxCell } from "../DataGridCheckboxCell/index.js"
import { DataGridHead } from "../DataGridHead/index.js"
import { DataGridHeadRow } from "../DataGridHeadRow/index.js"
import { DataGridHeadCell } from "../DataGridHeadCell/index.js"
import { DataGridFoot } from "../DataGridFoot/index.js"
import { DataGridFootRow } from "../DataGridFootRow/index.js"
import { DataGridToolbar } from "../DataGridToolbar/index.js"
import { Default as DataGridRowStory } from "../DataGridRow/DataGridRow.stories.js"
import { Default as DataGridCellStory } from "../DataGridCell/DataGridCell.stories.js"
import { Default as DataGridHeadStory } from "../DataGridHead/DataGridHead.stories.js"
import { Default as DataGridHeadRowStory } from "../DataGridHeadRow/DataGridHeadRow.stories.js"
import { Default as DataGridHeadCellStory } from "../DataGridHeadCell/DataGridHeadCell.stories.js"
import { Default as DataGridBodyStory } from "../DataGridBody/DataGridBody.stories.js"
import { Default as DataGridFootStory } from "../DataGridFoot/DataGridFoot.stories.js"
import { Default as DataGridFootRowStory } from "../DataGridFootRow/DataGridFootRow.stories.js"
import { Default as DataGridToolbarStory } from "../DataGridToolbar/DataGridToolbar.stories.js"


export default {
  title: "Design System/DataGrid/DataGrid",
  component: DataGrid,
  argTypes: {},
}

const Template = ({items, ...args}) =>
<DataGrid {...args}>
	<DataGridBody>
		{items.map((row, r) => (
			<DataGridRow key={`b_${r}`}>
				{row.items.map((cell, c) => (
					<DataGridCell {...cell} key={`b_${r}_${c}`} />
				))}
			</DataGridRow>
		))}
	</DataGridBody>
</DataGrid>

const WithHeadAndFootTemplate = ({items, ...args}) => 
<DataGrid {...args}>
	<DataGridHead>
		<DataGridHeadRow>
			{DataGridHeadRowStory.args.items.map((headcell, h) => (
				<DataGridHeadCell {...headcell} key={`h_${h}`} />
			))}
		</DataGridHeadRow>
	</DataGridHead>
	<DataGridBody>
		{items.map((row, r) => (
			<DataGridRow key={`b_${r}`}>
				{row.items.map((cell, c) => (
					<DataGridCell {...cell} key={`b_${r}_${c}`} />
				))}
			</DataGridRow>
		))}
	</DataGridBody>
	<DataGridFoot>
		<DataGridFootRow>
			{DataGridFootRowStory.args.items.map((footcell, f) => (
				<DataGridCell {...footcell} key={`f_${f}`} />
			))}
		</DataGridFootRow>
	</DataGridFoot>
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
	head: "foo",
	items: [
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
	]
}

export const Selectable = Template.bind({})
Selectable.parameters = {
	docs: {
		description: {
			story: "Jono Datagrid with Selectable rows"
		}
	}
}
Selectable.args = {
	selectable: true,
	items: [
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
	]
}

export const WithHeadAndFoot = WithHeadAndFootTemplate.bind({})
WithHeadAndFoot.parameters = {
	docs: {
		description: {
			story: "Juno DataGrid complete with Head and Foot"
		}
	}
}
WithHeadAndFoot.args = {
	items: [
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
	]
}

export const FullyFeatured = WithHeadAndFootTemplate.bind({})
FullyFeatured.parameters = {
	docs: {
		description: {
			story: "Fully-Featured Juno DataGrid complete with Head, Foot, and Toolbar"
		}
	}
}
FullyFeatured.args = {
	showToolbar: true,
	selectable: true,
	items: [
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
		{...DataGridRowStory.args},
	]
}
