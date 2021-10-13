import React from "react"
import { DataGridHead } from "./index.js"


export default {
  title: "Design System/DataGrid/DataGridHead",
  component: DataGridHead,
  argTypes: {},
}

const Template = (args) =>
<DataGridHead {...args}>
</DataGridHead>


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { 
	  story: "Juno DataGridHead for use in DataGrid"
	}
  },
}
Default.args = {
  children: [
  "DataGridHead goes here"
  ]
}