import React from "react"
import { Pill, Stack } from "juno-ui-components"

import FilterSelect from "./FilterSelect"
import useStore from "../../hooks/useStore"

const filtersStyles = `
  bg-theme-background-lvl-2
  py-2
  px-4
  my-px
`

const Filters = ({}) => {
  const filters = useStore((state) => state.filters)

  return (
    <Stack direction="vertical" gap="4" className={`filters ${filtersStyles}`}>
      <FilterSelect filters={filters} />
      <Stack gap="2">
        { Object.entries(filters.activeFilters).map(([key, values]) => {
          return (
            values.map((value) => 
              <Pill 
                pillKey={key}
                pillValue={value}
                closeable
                onClose={() => filters.removeActiveFilter(key, value)}
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