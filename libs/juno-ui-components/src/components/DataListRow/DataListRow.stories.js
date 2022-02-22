import React from "react"
import { DataListRow } from "./index.js"
import { DataListCell } from "../DataListCell/index.js"
import { Default as DataListCellStory } from "../DataListCell/DataListCell.stories.js"

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
