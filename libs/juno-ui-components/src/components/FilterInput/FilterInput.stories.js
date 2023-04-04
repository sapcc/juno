import React from "react"
import { FilterInput } from "./index.js"

export default {
  title: "Deprecated/Filter/FilterInput",
  component: FilterInput,
  argTypes: {},
}

const Template = (args) => <FilterInput {...args} />

export const Default = Template.bind({})
Default.args = {
  valuePlaceholder: "Enter a value",
  options: [
    { label: "Filter 1", key: "filter-1" },
    { label: "Filter 2", key: "filter-2", disabled: true },
    { label: "Filter 3", key: "filter-3" },
  ],
}

export const Preselected = Template.bind({})
Preselected.args = {
  keyLabel: "Select a fancy Filter",
  selectedFilterKey: "filter-2",
  options: [
    { label: "Filter 1", key: "filter-1" },
    { label: "Filter 2", key: "filter-2" },
    { label: "Filter 3", key: "filter-3" },
  ],
}

export const Loading = Template.bind({})
Loading.args = {
  options: [],
  loading: true,
}

export const WithError = Template.bind({})
WithError.args = {
  options: [],
  error: true,
}
