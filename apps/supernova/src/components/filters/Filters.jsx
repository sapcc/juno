import React from "react"
import { Pill, Stack } from "juno-ui-components"

import FilterSelect from "./FilterSelect"
import { useActiveFilters, useFilterActions } from "../../hooks/useStore"

const filtersStyles = `
  bg-theme-background-lvl-2
  py-2
  px-4
  my-px
`

const Filters = () => {
  const activeFilters = useActiveFilters()
  const { removeActiveFilter } = useFilterActions()

  return (
    <Stack direction="vertical" gap="4" className={`filters ${filtersStyles}`}>
      <FilterSelect />
      <Stack gap="2">
        { Object.entries(activeFilters).map(([key, values]) => {
          return (
            values.map((value) => 
              <Pill 
                pillKey={key}
                pillValue={value}
                closeable
                onClose={() => removeActiveFilter(key, value)}
                key={`${key}:${value}`}
              />
            )
          )
        })}
      </Stack>
    </Stack>
  )
}

export default Filters