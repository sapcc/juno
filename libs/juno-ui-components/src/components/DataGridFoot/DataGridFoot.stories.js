import React from "react"
import { DataGridFoot } from "./index.js"
import { Default as DataGridCell } from "../DataGridCell/DataGridCell.stories.js"
import { Default as DataGridFootRow } from "../DataGridFootRow/DataGridFootRow.stories.js"


export default {
  title: "Design System/DataGrid/DataGridFoot",
  component: DataGridFoot,
  argTypes: {},
}

const Template = (args) =>
<DataGridFoot {...args}>
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
  children: [
  	<DataGridFootRow>
      <DataGridCell>Cell</DataGridCell>
      <DataGridCell>Cell</DataGridCell>
      <DataGridCell>Cell</DataGridCell>
    </DataGridFootRow>
  ]
}