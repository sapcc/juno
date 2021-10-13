import React from "react"
import { DataGridBody } from "./index.js"


export default {
  title: "Design System/DataGrid/DataGridBody",
  component: DataGridBody,
  argTypes: {},
}

const Template = (args) =>
<DataGridBody {...args}>
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
  children: [
  "DataGridBody goes here"
  ]
}