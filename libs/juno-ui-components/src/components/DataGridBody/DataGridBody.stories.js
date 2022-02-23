import React from "react"
import { DataGridBody } from "./index.js"
import { DataGridRow } from "../DataGridRow/index.js"
import { DataGridCell } from "../DataGridCell/index.js"
import { Default as DataGridRowStory } from "../DataGridRow/DataGridRow.stories.js"
import { Default as DataGridCellStory } from "../DataGridCell/DataGridCell.stories.js"


export default {
  title: "Design System/DataGrid/DataGridBody",
  component: DataGridBody,
  argTypes: {},
  decorators: [ story => <table>{story()}</table>],
}

const Template = ({items, ...args}) =>
	<DataGridBody {...args}>
		{items.map((item, i) => (
			<DataGridRow key={`b_${i}`}>
				{item.args.items.map((cell, c) => 
					<DataGridCell {...cell} key={`b_${i}_{c}`} />
				)}
			</DataGridRow>
		))}
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
  items: [
  	{...DataGridRowStory},
	{...DataGridRowStory},
	{...DataGridRowStory},
	{...DataGridRowStory},
	{...DataGridRowStory},
  ]
}

