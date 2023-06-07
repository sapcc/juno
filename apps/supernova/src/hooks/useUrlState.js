import { useLayoutEffect, useEffect } from "react"
import { registerConsumer } from "url-state-provider"
import {
  useAuthLoggedIn,
  useFilterLabels,
  useFilterActions,
  useActiveFilters,
  useGlobalsActions,
} from "./useStore"

const urlStateManager = registerConsumer("supernova")
const ACTIVE_FILTERS = "f"

const useUrlState = () => {
  const loggedIn = useAuthLoggedIn()
  const { setActiveFilters } = useFilterActions()
  const activeFilters = useActiveFilters()
  const { setIsUrlStateSetup } = useGlobalsActions()

  // Set initial state from URL (on login)
  // do with useLayoutEffect so the ui isn't rendered before
  useLayoutEffect(() => {
    if (!loggedIn) return
    let activeFilters = urlStateManager.currentState()?.[ACTIVE_FILTERS]
    if (activeFilters) {
      setActiveFilters(activeFilters)
    }
    setIsUrlStateSetup(true)
  }, [loggedIn, setActiveFilters])

  // sync URL state
  useEffect(() => {
    if (!loggedIn) return
    // activeFilters: {cluster:["test1", "test2"], region: ["test1"]}
    urlStateManager.push({ [ACTIVE_FILTERS]: activeFilters })
  }, [loggedIn, activeFilters])
}

export default useUrlState
