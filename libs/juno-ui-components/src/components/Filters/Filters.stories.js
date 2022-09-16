import React from "react"
import { Filters } from "./index.js"
import { FilterPill } from "../FilterPill/FilterPill.component"
import { SearchInput } from "../SearchInput/SearchInput.component"

export default {
  title: "Components/Filter/Filters",
  component: Filters,
  argTypes: {},
}

const Template = (args) => <Filters {...args} />

const PillsTemplate = (args) => (
  <Filters {...args}>
    {args.filters && args.filters.options && args.filters.options.length
      ? args.filters.options.map((filter, i) => (
          <FilterPill
            filterKey={filter.key}
            filterKeyLabel={filter.label}
            filterValue={`value_${i}`}
            filterValueLabel={`Value ${i}`}
            key={`filter-${i}`}
            onClose={() => console.log(filter.key, "closing")}
          />
        ))
      : null}
  </Filters>
)

export const Default = Template.bind({})
Default.args = {
  valuePlaceholder: "Enter a value",
  filters: {
    keyLabel: "Select a Filter",
    options: [{ key: "filter-1", label: "Filter 1" }],
  },
}

export const Loading = Template.bind({})
Loading.args = {
  filters: {
    keyLabel: "Select a Filter",
    options: [],
  },
  loading: true,
}

export const WithPills = PillsTemplate.bind({})
WithPills.args = {
  filters: {
    keyLabel: "Select a Filter",
    options: [
      { key: "filter-01", label: "Filter 1" },
      { key: "filter-02", label: "Filter 2" },
      { key: "filter-03", label: "Filter 3" },
    ],
  },
}

export const PreseletedWithSearch = Template.bind({})
PreseletedWithSearch.args = {
  selectedFilterKey: "filter-2",
  search: (
    <SearchInput
      onSearch={() => {
        console.log("Searching…")
      }}
    />
  ),
  filters: {
    keyLabel: "Select a Filter",
    options: [
      { key: "filter-01", label: "Filter 1" },
      { key: "filter-02", label: "Filter 2" },
      { key: "filter-03", label: "Filter 3" },
    ],
  },
}

export const SearchOnly = Template.bind({})
const searchProps = {
  onSearch: () => {
    console.log("Searching…")
  },
}
SearchOnly.args = {
  search: (
    <SearchInput
      onSearch={() => {
        console.log("Searching…")
      }}
    />
  ),
}
