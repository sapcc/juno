import React, { useState } from "react"

import {
  Button,
  InputGroup,
  SelectOption,
  SelectRow,
  TextInput,
} from "juno-ui-components"
import { useFilterLabels, useFilterActions } from "../../hooks/useStore"


const FilterSelect = () => {
  const [filterLabel, setFilterLabel] = useState()
  const [filterValue, setFilterValue] = useState("")

  const { addActiveFilter } = useFilterActions()
  const filterLabels = useFilterLabels() 

  const handleFilterAdd = () => {
    if (filterLabel && filterValue) {
      // add active filter to store
      addActiveFilter(filterLabel, filterValue)

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
        {filterLabels?.map((filterLabel) => (
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
