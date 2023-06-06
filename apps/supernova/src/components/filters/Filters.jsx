import React, { useLayoutEffect } from "react"
import { Stack } from "juno-ui-components"

import FilterSelect from "./FilterSelect"
import FilterPills from "./FilterPills"

import {
  useAuthData,
  useFilterLabels,
  useFilterActions,
} from "../../hooks/useStore"

const filtersStyles = `
  bg-theme-background-lvl-2
  py-2
  px-4
  my-px
`

const Filters = () => {
  const authData = useAuthData()
  const filterLabels = useFilterLabels()
  const { addActiveFilter } = useFilterActions()

  // load predefined filters
  // TODO: rewrite this process when filters coming per url
  useLayoutEffect(() => {
    if (!authData || !Array.isArray(filterLabels) || filterLabels?.length <= 0)
      return

    // if no support_group (teams) do nothing
    if (!authData?.parsed?.teams || !Array.isArray(authData?.parsed?.teams))
      return

    // if there is no label defined return
    // TODO: change when mapping available
    const label = "support_group"
    if (!filterLabels.includes(label)) return

    authData.parsed.teams.forEach((team) => {
      addActiveFilter(label, team)
    })
  }, [filterLabels, authData, addActiveFilter])

  return (
    <Stack direction="vertical" gap="4" className={`filters ${filtersStyles}`}>
      <FilterSelect />
      <FilterPills />
    </Stack>
  )
}

export default Filters
