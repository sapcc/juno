import React from "react"
import { FilterInput } from "./index.js"

export default {
  title: "WiP/Filter/FilterInput",
  component: FilterInput,
  argTypes: {},
}

const Template = (args) => <FilterInput {...args} />

export const Default = Template.bind({})
Default.args = {
	options: [
		{label: "Filter 1", value: "filter-1"},
		{label: "Filter 2", value: "filter-2"},
		{label: "Filter 3", value: "filter-3"},
	  ]
}