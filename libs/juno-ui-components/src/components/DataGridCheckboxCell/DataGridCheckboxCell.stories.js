import React from "react"
import { DataGridCheckboxCell } from "./index.js"


export default {
  title: "Design System/DataGrid/DataGridCheckboxCell",
  component: DataGridCheckboxCell,
  argTypes: {},
  decorators: [ story => <table><tbody><tr>{story()}</tr></tbody></table>],
}

const Template = (args) =>
<DataGridCheckboxCell {...args}>
</DataGridCheckboxCell>


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	  description: { 
	    story: "Juno DataGridCheckboxCell for use in DataGrid"
	  }
  },
}
Default.args = {}

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
	description: { 
	  story: "Disabled Juno DataGridCheckboxCell for use in DataGrid"
	}
  },
}
Disabled.args = {
	disabled: true
}