import React from "react"
import { DataGrid } from "./index.js"


export default {
  title: "Design System/DataGrid/DataGrid",
  component: DataGrid,
  argTypes: {},
}

const Template = (args) =>
<DataGrid {...args}>
</DataGrid>


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { 
	  story: "Juno DataGrid for displaying data"
	}
  },
}
Default.args = {
  children: [
  "DataGrid goes here"
  ]
}

