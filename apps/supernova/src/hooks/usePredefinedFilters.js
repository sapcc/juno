import { useEffect } from "react"

import {
  useAuthData,
  useFilterLabels,
  useFilterActions,
  useActiveFilters,
  useGlobalsIsUrlStateSetup,
} from "./useStore"

const usePredefinedFilters = () => {
  const authData = useAuthData()
  const filterLabels = useFilterLabels()
  const { addActiveFilter } = useFilterActions()
  const activeFilters = useActiveFilters()
  const isUrlStateSetup = useGlobalsIsUrlStateSetup()

  // load predefined filters
  useEffect(() => {
    // wait until state from Url is set
    if (!isUrlStateSetup) return

    // if filters already set through url state provider do nothing
    if (activeFilters && Object.keys(activeFilters).length > 0) return

    // if no support_group of labels available return
    if (authData?.parsed?.teams?.length <= 0 || filterLabels?.length <= 0)
      return

    // if there is no label defined return
    const label = "support_group"
    if (!filterLabels.includes(label)) return

    authData.parsed.teams.forEach((team) => {
      addActiveFilter(label, team)
    })
  }, [filterLabels, authData, addActiveFilter, isUrlStateSetup])
}

export default usePredefinedFilters
