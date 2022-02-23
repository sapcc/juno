import React from "react"
import { DataGridHeadRow } from "./index.js"
import { DataGridHeadCell } from "../DataGridHeadCell/index.js"
import { Default as DataGridHeadCellStory } from "../DataGridHeadCell/DataGridHeadCell.stories.js"


export default {
  title: "Design System/DataGrid/DataGridHeadRow",
  component: DataGridHeadRow,
  argTypes: {},
  decorators: [ story => <table><tbody>{story()}</tbody></table>],
}

const Template = ({ items, ...args }) => (
  <DataGridHeadRow {...args}>
    {items.map((item, i) => (
      <DataGridHeadCell {...item} key={`${i}`} />
    ))}
  </DataGridHeadRow>
)


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	  description: { 
	    story: "Juno DataGridHeadRow for use in DataGrid head"
	  }
  },
}
Default.args = {
  items: [
    {...DataGridHeadCellStory.args},
    {...DataGridHeadCellStory.args, sortable: true, children: "Sortable"},
    {...DataGridHeadCellStory.args, sortable: true, children: "Sortable"},
    {...DataGridHeadCellStory.args},
    {...DataGridHeadCellStory.args},
  ]
}