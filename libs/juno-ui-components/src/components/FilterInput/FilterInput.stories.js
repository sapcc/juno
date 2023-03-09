import React from "react"
import { FilterInput } from "./index.js"

export default {
  title: "Components/Filter/FilterInput",
  component: FilterInput,
  argTypes: {},
}

const Template = (args) => <FilterInput {...args} />

export const Default = Template.bind({})
Default.args = {
  keyPlaceholder: "Select a Filter…",
  valuePlaceholder: "Enter a value",
  options: [
    { label: "Filter 1", key: "1" },
    { label: "Filter 2", key: "2" },
    { label: "Filter 3", key: "3" },
    { label: "Filter 4", key: "4" },
    { label: "Filter 5", key: "5" },
  ],
}

export const Preselected = Template.bind({})
Preselected.args = {
  filterKey: "Filter 3",
  options: [
    { label: "Filter 1", key: "1" },
    { label: "Filter 2", key: "2" },
    { label: "Filter 3", key: "3" },
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

