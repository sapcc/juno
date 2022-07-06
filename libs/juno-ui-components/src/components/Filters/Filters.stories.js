import React from "react"
import { Filters } from "./index.js"
import { FilterPill } from "../FilterPill/FilterPill.component"
import { SearchInput } from "../SearchInput/SearchInput.component"


export default {
  title: "WiP/Filter/Filters",
  component: Filters,
  argTypes: {},
}

const Template = (args) => <Filters {...args}>
    {
      args.filters && args.filters.options && args.filters.options.length ? args.filters.options.map((filter, i) => (
        <FilterPill label={filter.label} value={filter.value} key={`filter-${i}`} />
        ))
    :
      null
    }
</Filters>

export const Default = Template.bind({})
Default.args = {
  filters: {
    label: "Select a Filter",
    options: [
      {label: "Filter 1", value: "filter-1"},
      {label: "Filter 2", value: "filter-2"},
      {label: "Filter 3", value: "filter-3"},
    ]
  }
}

export const WithSearch = Template.bind({})
WithSearch.args = {
  search: <SearchInput />,
  filters: {
    label: "Select a Filter",
    options: [
      {label: "Filter 1", value: "filter-1"},
      {label: "Filter 2", value: "filter-2"},
      {label: "Filter 3", value: "filter-3"},
    ]
  }
}

export const SearchOnly = Template.bind({})
SearchOnly.args = {
  search: <SearchInput />,
}