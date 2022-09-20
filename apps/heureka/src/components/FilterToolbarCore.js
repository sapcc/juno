import React, { useMemo, useState, useEffect, useCallback } from "react"
import { Filters, FilterPill } from "juno-ui-components"
import { useStore } from "./FilterToolbarStore"

// group selected filters bey key so it can be forwarded as options to the query
const groupByKey = (items) => {
  let options = {}
  items.forEach((item) => {
    if (options[item.key]) {
      options[item.key] = `${options[item.key]},${item.value}`
      return
    }
    options[item.key] = item.value
  })
  return options
}

// onSearchTerm (callback): returns key:value selected filters, ex: {name: "Elektra"}
// isLoading (boolean): sets the tool in loading state
// filterLabels (object): labels matching the filter key to be displayed in the dropdown. Ex: {name: "service name"}
// placeholders (object): placeholders matching the selected key
const FilterToolbarCore = ({
  onSearchTerm,
  isLoading,
  filterLabels,
  placeholders,
}) => {
  const selectedFilters = useStore(useCallback((state) => state.filters))
  const filterTypes = useStore(useCallback((state) => state.filterTypes))
  const addFilter = useStore((state) => state.addFilter)
  const removeFilter = useStore((state) => state.removeFilter)

  const [placeholder, setPlaceholder] = useState("")
  const [filterKey, setFilterKey] = useState("")
  const [error, setError] = useState(null)

  const filterOptions = useMemo(() => {
    if (typeof filterTypes !== "object") return []
    let result = []
    Object.keys(filterTypes).forEach((key) => {
      // check if there is a label for the key
      const label =
        filterLabels && typeof filterLabels === "object" && filterLabels[key]
      result.push({ label: label || key, key: key })
    })
    return result
  }, [filterTypes, filterLabels])

  useEffect(() => {
    onSearchTerm(groupByKey(selectedFilters))
  }, [selectedFilters])

  const onSelectChange = (event) => {
    const selectedValue = event.target.value
    let label = `Please enter ${selectedValue}`
    if (placeholders && placeholders[selectedValue]) {
      label = placeholders[selectedValue]
    }
    // save the selected key
    setFilterKey(selectedValue)
    // set the new placeholder
    setPlaceholder(label)
  }

  const onPillClosed = (uid) => {
    removeFilter(uid)
  }

  const onFilter = (value) => {
    setError(null)
    if (filterKey === "") {
      return setError("Please select a filter type")
    }
    addFilter(filterKey, value)
  }

  return (
    <Filters
      filters={{
        label: "Select a Filter",
        options: filterOptions,
      }}
      valuePlaceholder={placeholder}
      loading={isLoading}
      onFilter={(e) => onFilter(e.target.value)}
      onSelectedFilterKeyChange={onSelectChange}
    >
      {selectedFilters.map((item, index) => (
        <FilterPill
          key={index}
          uid={item.uid}
          filterKey={item.key}
          filterValue={item.value}
          onClose={onPillClosed}
        />
      ))}
      {error && <span className="text-theme-danger">{error}</span>}
    </Filters>
  )
}

export default FilterToolbarCore
