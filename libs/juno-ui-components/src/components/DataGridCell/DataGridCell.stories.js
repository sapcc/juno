import React from "react"
import { DataGridCell } from "./index.js"


export default {
  title: "Design System/DataGrid/DataGridCell",
  component: DataGridCell,
  argTypes: {},
  decorators: [ story => <table><tbody><tr>{story()}</tr></tbody></table>],
}

const Template = (args) =>
<DataGridCell {...args}>
</DataGridCell>


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { 
	  story: "Juno DataGridCell for use in DataGrid"
	}
  },
}
Default.args = {
  children: [
  "DataGridCell goes here"
  ]
}