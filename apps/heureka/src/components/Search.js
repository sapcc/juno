import React, { useMemo, useState, useEffect } from "react"
import { Filters, FilterPill } from "juno-ui-components"

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

const Search = ({ filters, onSearchTerm, isLoading }) => {
  const [placeholder, setPlaceholder] = useState("")
  const [filterKey, setFilterKey] = useState("")
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

  // const filterKeys = useMemo(() => {
  //   if (!filters) return []
  //   if (filters && typeof filters === "object") return Object.keys(filters)
  // }, [filters])

  // useEffect(() => {
  //   const key = filterKeys.length > 0 && filterKeys[0]
  //   const value = filterKeys.length > 0 && filters[filterKeys[0]]
  //   const label = filterLabel(value, key)
  //   setPlaceholder(label)
  //   setFilterKey(key)
  // }, [filterKeys])

  const onSelectChange = (event) => {
    const selectedValue = event.target.value
    const label = filterLabel(filters[selectedValue], selectedValue)
    // save the selected key
    setFilterKey(selectedValue)
    // set the new placeholder
    setPlaceholder(label)
  }

  const onSearch = (value) => {
    setError(null)
    if (filterKey === "") {
      setError("Please select a filter")
    }
    onSearchTerm(filterKey, value)
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
      onFilterClear={() => onSearch("")}
      onSelectedFilterKeyChange={onSelectChange}
    >
      {error && <span className="text-theme-danger">{error}</span>}
    </Filters>
  )
}

export default Search
