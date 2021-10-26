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

export const Sortable = Template.bind({})
Sortable.parameters = {
  docs: {
    description: {
      story: "DatagridHeadCell for a sortable column"
    }
  }
}
Sortable.args = {
  sortable: true,
  children: [
    "Sort me"
  ]
}