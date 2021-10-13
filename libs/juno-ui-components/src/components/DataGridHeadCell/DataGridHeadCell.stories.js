import React from "react"
import { DataGridHeadCell } from "./index.js"


export default {
  title: "Design System/DataGrid/DataGridHeadCell",
  component: DataGridHeadCell,
  argTypes: {},
}

const Template = (args) =>
<DataGridHeadCell {...args}>
</DataGridHeadCell>


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { 
	  story: "Juno DataGridHeadCell for use in DataGrid"
	}
  },
}
Default.args = {
  children: [
  "DataGridHeadCell goes here"
  ]
}