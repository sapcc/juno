import React from "react"
import { DataList } from "./index.js"
import { Default as DataListRow } from "../DataListRow/DataListRow.stories.js"
import { Default as DataListCell } from "../DataListCell/DataListCell.stories.js"

export default {
  title: "Design System/DataList/DataList",
  component: DataList,
  argTypes: {},
}

const Template = (args) =>
<DataList {...args}>
</DataList>


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { 
	  story: "Juno DataList for displaying data"
	}
  },
}
Default.args = {
  children: [
	<DataList key="1">
		<DataListRow key="1_1">
			<DataListCell key="1_1_1">DataListCell</DataListCell>
			<DataListCell key="1_1_2">DataListCell</DataListCell>
			<DataListCell key="1_1_3">DataListCell</DataListCell>
			<DataListCell key="1_1_4">DataListCell</DataListCell>
			<DataListCell key="1_1_5">DataListCell</DataListCell>
		</DataListRow>
		<DataListRow key="2_1">
			<DataListCell key="2_1_1">DataListCell</DataListCell>
			<DataListCell key="2_1_2">DataListCell</DataListCell>
			<DataListCell key="2_1_3">DataListCell</DataListCell>
			<DataListCell key="2_1_4">DataListCell</DataListCell>
			<DataListCell key="2_1_5">DataListCell</DataListCell>
		</DataListRow>
	</DataList>
  ]
}