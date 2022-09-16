import React, { useMemo, useState, useEffect } from "react"
import { Filters, FilterPill } from "juno-ui-components"
import uniqueId from "lodash.uniqueid"

const SEARCH_STRING_TYPE = "string"
const SEARCH_ARRAY_TYPE = "[string]"
const SEARCH_BY_SAPIDS = ["owners", "operators"]

const filterLabel = (filterType, filterName) => {
  let label = "Please enter..."
  if (filterType === SEARCH_STRING_TYPE) label = `Please enter a ${filterName}`
  if (filterType === SEARCH_ARRAY_TYPE) {
    const isSapId = SEARCH_BY_SAPIDS.find((item) => item === filterName)
    label = `Comma separated list`
    if (isSapId) label = `SapIds_1,SapIds_2...`
  }
  return label
}

const FilterToolbar = ({ filters, onSearchTerm, isLoading }) => {
  const [placeholder, setPlaceholder] = useState("")
  const [filterKey, setFilterKey] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({})
  const [error, setError] = useState(null)

  const filterOptions = useMemo(() => {
    if (typeof filters === "object") {
      let result = []
      Object.keys(filters).forEach((key) => {
        result.push({ label: key, key: key })
      })
      return result
    }
    return []
  }, [filters])

  useEffect(() => {
    onSearchTerm(selectedFilters)
  }, [selectedFilters])

  const pills = useMemo(() => {
    return Object.keys(selectedFilters).map((sfk, index) => {
      const filterKey = sfk
      const filterValue = selectedFilters[sfk]
      console.log("pills: ", filterKey, filterValue, index)
      return (
        <FilterPill
          key={index}
          uid={filterKey}
          filterKey={filterKey}
          filterValue={filterValue}
          onClose={onPillClosed}
        />
      )
    })
  }, [selectedFilters])

  const onSelectChange = (event) => {
    const selectedValue = event.target.value
    const label = filterLabel(filters[selectedValue], selectedValue)
    // save the selected key
    setFilterKey(selectedValue)
    // set the new placeholder
    setPlaceholder(label)
  }

  const onPillClosed = (uid) => {
    let newSelectedFilters = { ...selectedFilters }
    delete newSelectedFilters[uid]
    setSelectedFilters(newSelectedFilters)
  }

  const onSearch = (value) => {
    setError(null)
    if (filterKey === "") {
      setError("Please select a filter")
    }
    // update selected filter key:value
    setSelectedFilters({ ...selectedFilters, [filterKey]: value })
  }

  return (
    <Filters
      filters={{
        label: "Select a Filter",
        options: filterOptions,
      }}
      valuePlaceholder={placeholder}
      loading={isLoading}
      onFilter={(e) => onSearch(e.target.value)}
      onSelectedFilterKeyChange={onSelectChange}
    >
      {Object.keys(selectedFilters).map((sfk, index) => (
        <FilterPill
          key={index}
          uid={sfk}
          filterKey={sfk}
          filterValue={selectedFilters[sfk]}
          onClose={onPillClosed}
        />
      ))}
      {error && <span className="text-theme-danger">{error}</span>}
    </Filters>
  )
}

export default FilterToolbar
