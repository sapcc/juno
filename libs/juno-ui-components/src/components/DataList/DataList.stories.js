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
		<DataListCell key="1-1_1">Default Cell</DataListCell>
		<DataListCell key="1-1_2">Default Cell</DataListCell>
		<DataListCell key="1-1_3">Default Cell</DataListCell>
		<DataListCell key="1-1_4">Default Cell</DataListCell>
		<DataListCell key="1-1_5">Default Cell</DataListCell>
	</DataListRow>,
	<DataListRow key="1-2">
		<DataListCell key="1-2_1">Default Cell</DataListCell>
		<DataListCell key="1-2_2">Default Cell</DataListCell>
		<DataListCell key="1-2_3">Default Cell</DataListCell>
		<DataListCell key="1-2_4">Default Cell</DataListCell>
		<DataListCell key="1-2_5">Default Cell</DataListCell>
	</DataListRow>,
	<DataListRow key="1-3">
		<DataListCell key="1-3_1">Default Cell</DataListCell>
		<DataListCell key="1-3_2">Default Cell</DataListCell>
		<DataListCell key="1-3_3">Default Cell</DataListCell>
		<DataListCell key="1-3_4">Default Cell</DataListCell>
		<DataListCell key="1-3_5">Default Cell</DataListCell>
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
			<DataListCell key="2-1_1">Default Cell</DataListCell>
			<DataListCell key="2-1_2" auto >Auto Cell</DataListCell>
			<DataListCell key="2-1_3">DefaultCell</DataListCell>
			<DataListCell key="2-1_4">DefaultCell</DataListCell>
			<DataListCell key="2-1_5">DefaultCell</DataListCell>
		</DataListRow>,
		<DataListRow key="2-2">
			<DataListCell key="2-2_1">DefaultCell</DataListCell>
			<DataListCell key="2-2_2" auto >Auto Cell</DataListCell>
			<DataListCell key="2-2_3">DefaultCell</DataListCell>
			<DataListCell key="2-2_4">DefaultCell</DataListCell>
			<DataListCell key="2-2_5">DefaultCell</DataListCell>
		</DataListRow>,
		<DataListRow key="2-3">
			<DataListCell key="2-3_1">DefaultCell</DataListCell>
			<DataListCell key="2-3_2"auto >Auto Cell</DataListCell>
			<DataListCell key="2-3_3">DefaultCell</DataListCell>
			<DataListCell key="2-3_4">DefaultCell</DataListCell>
			<DataListCell key="2-3_5">DefaultCell</DataListCell>
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
			<DataListCell key="3-1_1" width={10} >10% Cell</DataListCell>
			<DataListCell key="3-1_2" width={45} >45% Cell</DataListCell>
			<DataListCell key="3-1_3" width={25} >25% Cell</DataListCell>
			<DataListCell key="3-1_4" width={10} >10% Cell</DataListCell>
			<DataListCell key="3-1_5" width={10} >10% Cell</DataListCell>
		</DataListRow>,
		<DataListRow key="3-2">
			<DataListCell key="3-2_1" width={10} >10% Cell</DataListCell>
			<DataListCell key="3-2_2" width={45} >45% Cell</DataListCell>
			<DataListCell key="3-2_3" width={25} >25% Cell</DataListCell>
			<DataListCell key="3-2_4" width={10} >10% Cell</DataListCell>
			<DataListCell key="3-2_5" width={10} >10% Cell</DataListCell>
		</DataListRow>,
		<DataListRow key="3-3">
			<DataListCell key="3-3_1" width={10} >10% Cell</DataListCell>
			<DataListCell key="3-3_2" width={45} >45% Cell</DataListCell>
			<DataListCell key="3-3_3" width={25} >25% Cell</DataListCell>
			<DataListCell key="3-3_4" width={10} >10% Cell</DataListCell>
			<DataListCell key="3-3_5" width={10} >10% Cell</DataListCell>
		</DataListRow>
	]
}

export const Cols = Template.bind({})
Cols.parameters = {
	docs: {
		description: {
			story: "Juno DataList with grid column-based column widths"
		}
	}
}
Cols.args = {
	children: [
		<DataListRow key="4-1">
			<DataListCell key="4-1_1" cols={1} >Col-1 Cell</DataListCell>
			<DataListCell key="4-1_2" cols={6} >Col-6 Cell</DataListCell>
			<DataListCell key="4-1_3" cols={3} >Col-3 Cell</DataListCell>
			<DataListCell key="4-1_4" cols={1} >Col-1 Cell</DataListCell>
			<DataListCell key="4-1_5" cols={1} >Col-1 Cell</DataListCell>
		</DataListRow>,
		<DataListRow key="4-2">
			<DataListCell key="4-2_1" cols={1} >Col-1 Cell</DataListCell>
			<DataListCell key="4-2_2" cols={6} >Col-6 Cell</DataListCell>
			<DataListCell key="4-2_3" cols={3} >Col-3 Cell</DataListCell>
			<DataListCell key="4-2_4" cols={1} >Col-1 Cell</DataListCell>
			<DataListCell key="4-2_5" cols={1} >Col-1 Cell</DataListCell>
		</DataListRow>,
		<DataListRow key="4-3">
			<DataListCell key="4-3_1" cols={1} >Col-1 Cell</DataListCell>
			<DataListCell key="4-3_2" cols={6} >Col-6 Cell</DataListCell>
			<DataListCell key="4-3_3" cols={3} >Col-3 Cell</DataListCell>
			<DataListCell key="4-3_4" cols={1} >Col-1 Cell</DataListCell>
			<DataListCell key="4-3_5" cols={1} >Col-1 Cell</DataListCell>
		</DataListRow>
	]
}

export const Selectable = Template.bind({})
Selectable.parameters = {
	docs: {
		description: {
			story: "Juno DataList with selectable items"
		}
	}
}
Selectable.args = {
	selectable: true,
	children: [
		<DataListRow key="5-1">
		<DataListCell key="5-1_1">Default Cell</DataListCell>
		<DataListCell key="5-1_2">Default Cell</DataListCell>
		<DataListCell key="5-1_3">Default Cell</DataListCell>
		<DataListCell key="5-1_4">Default Cell</DataListCell>
		<DataListCell key="5-1_5">Default Cell</DataListCell>
	</DataListRow>,
	<DataListRow key="5-2">
		<DataListCell key="5-2_1">Default Cell</DataListCell>
		<DataListCell key="5-2_2">Default Cell</DataListCell>
		<DataListCell key="5-2_3">Default Cell</DataListCell>
		<DataListCell key="5-2_4">Default Cell</DataListCell>
		<DataListCell key="5-2_5">Default Cell</DataListCell>
	</DataListRow>,
	<DataListRow key="5-3">
		<DataListCell key="5-3_1">Default Cell</DataListCell>
		<DataListCell key="5-3_2">Default Cell</DataListCell>
		<DataListCell key="5-3_3">Default Cell</DataListCell>
		<DataListCell key="5-3_4">Default Cell</DataListCell>
		<DataListCell key="5-3_5">Default Cell</DataListCell>
	</DataListRow>
	]
}