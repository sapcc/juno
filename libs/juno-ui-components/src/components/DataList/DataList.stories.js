import React from "react"
import { DataList } from "./index.js"
import { DataListRow } from "../DataListRow/index.js"
import { DataListCell } from "../DataListCell/index.js"
import { Default as DataListRowStory } from "../DataListRow/DataListRow.stories.js"
import { Default as DataListCellStory } from "../DataListCell/DataListCell.stories.js"
import { Selectable as SelectableDataListRowStory } from "../DataListRow/DataListRow.stories.js"
import { AutoWidth as AutoWidthDataListRowStory } from "../DataListRow/DataListRow.stories.js"
import { PercentageWidths as PercentageWidthsDataListRowStory } from "../DataListRow/DataListRow.stories.js"
import { GridFitted as GridFittedDataListRowStory } from "../DataListRow/DataListRow.stories.js"

export default {
  title: "Design System/DataList/DataList",
  component: DataList,
  argTypes: {},
}

const Template = ({items, ...args}) =>
<DataList {...args}>
	{items.map((item, i) => (
<<<<<<< HEAD
		<DataListRow key={`${i}`} >
=======
		<DataListRow {...item} key={`${i}`} >
>>>>>>> main
			{item.items.map((cell, c) =>
				<DataListCell {...cell} key={`${i}_${c}`} />
			)}
		</DataListRow>
	))}
</DataList>

export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { 
	  story: "Default Juno DataList for displaying data"
	}
  },
}
Default.args = {
  items: [
	  {...DataListRowStory.args},
	  {...DataListRowStory.args},
	  {...DataListRowStory.args},
	  {...DataListRowStory.args},
	  {...DataListRowStory.args},
  ]
}

export const Selectable = Template.bind({})
Selectable.parameters = {
	docs: {
		description: { 
		  story: "Selectable Juno DataList for displaying and selecting data"
		}
	  },
}
Selectable.args = {
	selectable: true,
	items: [
		{...SelectableDataListRowStory.args},
		{...SelectableDataListRowStory.args},
		{...SelectableDataListRowStory.args},
		{...SelectableDataListRowStory.args},
		{...SelectableDataListRowStory.args},
	]
}

export const Auto = Template.bind({})
Auto.parameters = {
	docs: {
		description: {
			story: "Juno DataList with one column set to 'auto' to maximize its width"
		}
	},
}
Auto.args = {
	items: [
		{...AutoWidthDataListRowStory.args},
		{...AutoWidthDataListRowStory.args},
		{...AutoWidthDataListRowStory.args},
		{...AutoWidthDataListRowStory.args},
		{...AutoWidthDataListRowStory.args},
	]
}

export const Percentage = Template.bind({})
Percentage.parameters = {
	docs: {
		description: {
			story: "Juno DataList with percentage-based column widths"
		}
	},
}
Percentage.args = {
	items: [
		{...PercentageWidthsDataListRowStory.args},
		{...PercentageWidthsDataListRowStory.args},
		{...PercentageWidthsDataListRowStory.args},
		{...PercentageWidthsDataListRowStory.args},
		{...PercentageWidthsDataListRowStory.args},
	]
}


export const GridFitted = Template.bind({})
GridFitted.parameters = {
	docs: {
		description: {
			story: "Juno DataList with grid column-based column widths"
		}
	},
}
GridFitted.args = {
	items: [
		{...GridFittedDataListRowStory.args},
		{...GridFittedDataListRowStory.args},
		{...GridFittedDataListRowStory.args},
		{...GridFittedDataListRowStory.args},
		{...GridFittedDataListRowStory.args},
	]
}
