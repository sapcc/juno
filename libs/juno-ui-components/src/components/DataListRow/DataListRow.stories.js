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
