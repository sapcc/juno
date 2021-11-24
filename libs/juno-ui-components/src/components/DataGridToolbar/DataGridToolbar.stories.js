import React from "react"
import { DataGridToolbar } from "./index.js"
import { Default as Button } from "../Button/Button.stories.js"


export default {
  title: "Design System/DataGrid/DataGridToolbar",
  component: DataGridToolbar,
  argTypes: {},
}

const Template = (args) =>
<DataGridToolbar {...args}>
</DataGridToolbar>


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { 
	  story: "Optional toolbar for use in DataGrid"
	}
  },
}
Default.args = {
 	search: true,
	addItems: true,
}