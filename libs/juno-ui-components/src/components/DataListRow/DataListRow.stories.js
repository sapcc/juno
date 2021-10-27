import React from "react"
import { DataListRow } from "./index.js"
import { Default as DataListCell } from "../DataListCell/DataListCell.stories.js"

export default {
  title: "Design System/DataList/DataListRow",
  component: DataListRow,
  argTypes: {},
}

const Template = (args) =>
<DataListRow {...args}>
</DataListRow>


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { 
	  story: "Juno DataListRow for displaying data"
	}
  },
}
Default.args = {
  children: [
	<DataListCell key="1_1_1">DataListCell</DataListCell>,
	<DataListCell key="1_1_2">DataListCell</DataListCell>,
	<DataListCell key="1_1_3">DataListCell</DataListCell>,
	<DataListCell key="1_1_4">DataListCell</DataListCell>,
	<DataListCell key="1_1_5">DataListCell</DataListCell>
  ]
}
