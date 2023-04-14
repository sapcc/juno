import React, { useState } from "react"

import {
  Button,
  InputGroup,
  SelectOption,
  SelectRow,
  TextInput,
} from "juno-ui-components"


const FilterSelect = ({ filters }) => {
  const [filterLabel, setFilterLabel] = useState()
  const [filterValue, setFilterValue] = useState("")

  const handleFilterAdd = () => {
    if (filterLabel && filterValue) {
      // add active filter to store
      // TODO: check that value exists in available values list
      filters.addActiveFilter(filterLabel, filterValue)

      // reset filterValue
      setFilterValue("")

      // TODO: remove filterValue from available value list
    } else {
      // TODO: show error -> please select filter/value
    }
  }

  return (
    <InputGroup>
      <SelectRow
        name="filter"
        className="w-64 mb-0"
        label="Filter"
        value={filterLabel}
        onValueChange={(val) => setFilterLabel(val)}
      >
        {filters?.labels?.map((filterLabel) => (
          <SelectOption
            value={filterLabel}
            label={filterLabel}
            key={filterLabel}
          />
        ))}
      </SelectRow>
      <TextInput
        value={filterValue}
        onChange={(event) => setFilterValue(event.target.value)}
        className="bg-theme-background-lvl-1 w-64"
      />
      <Button
        onClick={() => handleFilterAdd()}
        icon="filterAlt"
        className="py-[0.3rem]"
      />
    </InputGroup>
  )
}

export default FilterSelect
