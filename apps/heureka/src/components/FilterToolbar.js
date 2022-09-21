import React from "react"
import { FilterToolbarStateProvider } from "./FilterToolbarStore"
import FilterToolbarCore from "./FilterToolbarCore"

const FilterToolbar = ({
  filterTypes,
  onSearchTerm,
  isLoading,
  filterLabels,
  placeholders,
}) => {
  return (
    <FilterToolbarStateProvider filterTypes={filterTypes}>
      <FilterToolbarCore
        onSearchTerm={onSearchTerm}
        isLoading={isLoading}
        filterLabels={filterLabels}
        placeholders={placeholders}
      />
    </FilterToolbarStateProvider>
  )
}

export default FilterToolbar
