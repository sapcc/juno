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
	  story: "Default Juno DataList for displaying data"
	}
  },
}
Default.args = {
  children: [
	<DataListRow key="1-1">
		<DataListCell key="1-1_1">DataListCell</DataListCell>
		<DataListCell key="1-1_2">DataListCell</DataListCell>
		<DataListCell key="1-1_3">DataListCell</DataListCell>
		<DataListCell key="1-1_4">DataListCell</DataListCell>
		<DataListCell key="1-1_5">DataListCell</DataListCell>
	</DataListRow>,
	<DataListRow key="1-2">
		<DataListCell key="1-2_1">DataListCell</DataListCell>
		<DataListCell key="1-2_2">DataListCell</DataListCell>
		<DataListCell key="1-2_3">DataListCell</DataListCell>
		<DataListCell key="1-2_4">DataListCell</DataListCell>
		<DataListCell key="1-2_5">DataListCell</DataListCell>
	</DataListRow>,
	<DataListRow key="1-3">
		<DataListCell key="1-3_1">DataListCell</DataListCell>
		<DataListCell key="1-3_1">DataListCell</DataListCell>
		<DataListCell key="1-3_1">DataListCell</DataListCell>
		<DataListCell key="1-3_1">DataListCell</DataListCell>
		<DataListCell key="1-3_1">DataListCell</DataListCell>
	</DataListRow>
  ]
}

export const Max = Template.bind({})
Max.parameters = {
	docs: {
		description: {
			story: "Juno DataList with one column set to `auto`"
		}
	}
}
Max.args = {
	children: [
		<DataListRow key="2-1">
			<DataListCell key="2-1_1">DataListCell</DataListCell>
			<DataListCell key="2-1_2" auto >DataListCell</DataListCell>
			<DataListCell key="2-1_3">DataListCell</DataListCell>
			<DataListCell key="2-1_4">DataListCell</DataListCell>
			<DataListCell key="2-1_5">DataListCell</DataListCell>
		</DataListRow>,
		<DataListRow key="2-2">
			<DataListCell key="2-2_1">DataListCell</DataListCell>
			<DataListCell key="2-2_2" auto >DataListCell</DataListCell>
			<DataListCell key="2-2_3">DataListCell</DataListCell>
			<DataListCell key="2-2_4">DataListCell</DataListCell>
			<DataListCell key="2-2_5">DataListCell</DataListCell>
		</DataListRow>,
		<DataListRow key="2-3">
			<DataListCell key="2-3_1">DataListCell</DataListCell>
			<DataListCell key="2-3_2"auto >DataListCell</DataListCell>
			<DataListCell key="2-3_3">DataListCell</DataListCell>
			<DataListCell key="2-3_4">DataListCell</DataListCell>
			<DataListCell key="2-3_5">DataListCell</DataListCell>
		</DataListRow>
	]
}

export const PercentageWidth = Template.bind({})
PercentageWidth.parameters = {
	docs: {
		description: {
			story: "Juno DataList with percentage-based column widths"
		}
	}
}
PercentageWidth.args = {
	children: [
		<DataListRow key="3-1">
			<DataListCell key="3-1_1" width={10} >DataListCell</DataListCell>
			<DataListCell key="3-1_2" width={45} >DataListCell</DataListCell>
			<DataListCell key="3-1_3" width={25} >DataListCell</DataListCell>
			<DataListCell key="3-1_4" width={10} >DataListCell</DataListCell>
			<DataListCell key="3-1_5" width={10} >DataListCell</DataListCell>
		</DataListRow>,
		<DataListRow key="3-2">
			<DataListCell key="3-2_1" width={10} >DataListCell</DataListCell>
			<DataListCell key="3-2_2" width={45} >DataListCell</DataListCell>
			<DataListCell key="3-2_3" width={25} >DataListCell</DataListCell>
			<DataListCell key="3-2_4" width={10} >DataListCell</DataListCell>
			<DataListCell key="3-2_5" width={10} >DataListCell</DataListCell>
		</DataListRow>,
		<DataListRow key="3-3">
			<DataListCell key="3-3_1" width={10} >DataListCell</DataListCell>
			<DataListCell key="3-3_2" width={45} >DataListCell</DataListCell>
			<DataListCell key="3-3_3" width={25} >DataListCell</DataListCell>
			<DataListCell key="3-3_4" width={10} >DataListCell</DataListCell>
			<DataListCell key="3-3_5" width={10} >DataListCell</DataListCell>
		</DataListRow>
	]
}