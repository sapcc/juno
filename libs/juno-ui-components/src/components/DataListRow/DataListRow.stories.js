import React from "react"
import { DataListRow } from "./index.js"
import { DataListCell } from "../DataListCell/index.js"
import { DataListCheckboxCell } from "../DataListCheckboxCell/index.js"
import { Default as DataListCellStory } from "../DataListCell/DataListCell.stories.js"
import { Default as DataListCheckboxCellStory } from "../DataListCheckboxCell/DataListCheckboxCell.stories.js"

export default {
  title: "Design System/DataList/DataListRow",
  component: DataListRow,
  argTypes: {},
}

const Template = ({ items, ...args }) => (
	<DataListRow {...args}>
		{items.map((item, i) => (
			<DataListCell {...item} key={`${i}`} />
		))}
	</DataListRow>
)

const SelectableTemplate = ({ items, ...args}) => (
	<DataListRow {...args}>
		<DataListCheckboxCell />
		{items.map((item, i) => (
			<DataListCell {...item} key={`${i}`} />
		))}
	</DataListRow>
)

export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { 
	  story: "Juno DataListRow for displaying data"
	}
  },
}
Default.args = {
  items: [
	{...DataListCellStory.args},
	{...DataListCellStory.args},
	{...DataListCellStory.args},
	{...DataListCellStory.args},
	{...DataListCellStory.args},
  ]
}

export const Selectable = SelectableTemplate.bind({})
Selectable.parameters = {
	docs: {
		description: {
			story: "Selectable DataListRow for displaying and selecting data. Note that highlighting the row will not work when rendered outside a DataList. "
		}
	}
}
Selectable.args = {
	items: [
		{...DataListCellStory.args},
		{...DataListCellStory.args},
		{...DataListCellStory.args},
		{...DataListCellStory.args},
		{...DataListCellStory.args},
	]
}

export const AutoWidth = Template.bind({})
AutoWidth.parameters = {
	docs: {
		description: {
			story: "Row with one cell set to 'auto' in oder to maximize its width"
		}
	}
}
AutoWidth.args = {
	items: [
		{...DataListCellStory.args},
		{...DataListCellStory.args, auto: true, children: "Auto DataListCell"},
		{...DataListCellStory.args},
		{...DataListCellStory.args},
		{...DataListCellStory.args},
	]
}

export const PercentageWidths = Template.bind({})
PercentageWidths.parameters = {
	docs: {
		description: {
			story: "Row with Cells set to individual percentage widths"
		}
	}
}
PercentageWidths.args = {
	items: [
		{...DataListCellStory.args, width: 10},
		{...DataListCellStory.args, width: 45},
		{...DataListCellStory.args, width: 25},
		{...DataListCellStory.args, width: 10},
		{...DataListCellStory.args, width: 10},
	]
}

export const GridFitted = Template.bind({})
GridFitted.parameters = {
	docs: {
		description: {
			story: "Row with cells fitted to the Grid"
		}
	}
}
GridFitted.args = {
	items: [
		{...DataListCellStory.args, cols: 1, children: "cols 1"},
		{...DataListCellStory.args, cols: 6, children: "cols 6"},
		{...DataListCellStory.args, cols: 3, children: "cols 3"},
		{...DataListCellStory.args, cols: 2, children: "cols 2"},
	]
}
