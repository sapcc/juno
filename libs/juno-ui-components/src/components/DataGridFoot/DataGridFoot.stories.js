import React from "react"
import { DataGridFoot } from "./index.js"
import { DataGridFootRow } from "../DataGridFootRow/index.js"
import { DataGridCell } from "../DataGridCell/index.js"
import { Default as DataGridCellStory } from "../DataGridCell/DataGridCell.stories.js"
import { Default as DataGridFootRowStory } from "../DataGridFootRow/DataGridFootRow.stories.js"


export default {
  title: "Design System/DataGrid/DataGridFoot",
  component: DataGridFoot,
  argTypes: {},
  decorators: [ story => <table>{story()}</table>],
}

const Template = ({items, ...args}) =>
<DataGridFoot {...args}>
  {items.map((item, i) => (
    <DataGridFootRow key={`f_${i}`} >
      {item.items.map((cell, c) => (
        <DataGridCell {...cell} key={`f_${i}_${c}`} />
      ))}
    </DataGridFootRow>
  ))}
</DataGridFoot>


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	  description: { 
	    story: "Juno DataGridFoot for use in DataGrid"
	  }
  },
}
Default.args = {
  items: [
    {...DataGridFootRowStory.args},
  ]
}