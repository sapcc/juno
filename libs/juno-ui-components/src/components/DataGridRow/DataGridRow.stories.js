import React from "react"
import { DataGridRow } from "./index.js"
import { DataGridCell } from "../DataGridCell/index.js"
import { Default as DataGridCellStory } from "../DataGridCell/DataGridCell.stories.js"



export default {
  title: "Design System/DataGrid/DataGridRow",
  component: DataGridRow,
  argTypes: {},
  decorators: [ story => <table><tbody>{story()}</tbody></table>],
}

const Template = ({ items, ...args }) => (
  <DataGridRow {...args}>
    {items.map((item, i) => (
      <DataGridCell {...item} key={`${i}`} />
    ))}
  </DataGridRow>
)


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	  description: { 
	    story: "Juno DataGridRow for use in DataGrid"
	  }
  },
}
Default.args = {
  items: [
    {...DataGridCellStory.args},
    {...DataGridCellStory.args},
    {...DataGridCellStory.args},
    {...DataGridCellStory.args},
    {...DataGridCellStory.args},
  ]
}
