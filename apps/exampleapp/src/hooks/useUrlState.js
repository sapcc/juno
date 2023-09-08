import { useState, useEffect } from "react"
import { registerConsumer } from "url-state-provider"
import {
  useGlobalsDetailsViolationGroup,
  useGlobalsActions,
  useAuthLoggedIn,
  useAuthData,
  useFiltersActions,
  useFiltersSearchTerm,
  useFiltersActive,
} from "../components/StoreProvider"

const DEFAULT_KEY = "doop"
const ACTIVE_FILTERS = "f"
const SEARCH_TERM = "s"
const DETAILS_VIOLATION_GROUP = "v"

const useUrlState = (key) => {
  const [isURLRead, setIsURLRead] = useState(false)
  // it is possible to have two doop apps on the page
  // int his case the key should be different per app
  const urlStateManager = registerConsumer(key || DEFAULT_KEY)
  const loggedIn = useAuthLoggedIn()
  const authData = useAuthData()
  // filters
  const { set: setActiveFilters, setSearchTerm } = useFiltersActions()
  const activeFilters = useFiltersActive()
  const searchTerm = useFiltersSearchTerm()
  // globals
  const detailsViolationGroup = useGlobalsDetailsViolationGroup()
  const { setDetailsViolationGroup } = useGlobalsActions()

  // Set initial state from URL (on login)
  useEffect(() => {
    // don't read the url if we are already reading it or if we are not logged in
    if (isURLRead || !loggedIn) return
    console.log(
      `DOOP: (${key || DEFAULT_KEY}) setting up state from url:`,
      urlStateManager.currentState()
    )
    const searchTerm = urlStateManager.currentState()?.[SEARCH_TERM]
    const activeFilters = urlStateManager.currentState()?.[ACTIVE_FILTERS]

    const detailsViolationGroup =
      urlStateManager.currentState()?.[DETAILS_VIOLATION_GROUP]
    // if there are no filters in the url, but there are teams in the auth data
    // set the active filters to the teams
    if (activeFilters === undefined && authData?.parsed?.teams) {
      setActiveFilters(
        authData?.parsed?.teams?.map((team) => ({
          key: "supportGroup",
          value: team,
        }))
      )
    }
    if (searchTerm) {
      setSearchTerm(searchTerm)
    }
    if (activeFilters) {
      setActiveFilters(activeFilters)
    }
    if (detailsViolationGroup) {
      setDetailsViolationGroup(detailsViolationGroup)
    }
    setIsURLRead(true)
  }, [
    loggedIn,
    authData,
    setActiveFilters,
    setDetailsViolationGroup,
    setSearchTerm,
  ])
  // sync activeFilters to URL state
  useEffect(() => {
    // don't sync if we are not logged in OR if we are already reading the url
    if (!isURLRead || !loggedIn) return
    urlStateManager.push({
      [ACTIVE_FILTERS]: activeFilters,
      [DETAILS_VIOLATION_GROUP]: detailsViolationGroup,
      [SEARCH_TERM]: searchTerm,
    })
  }, [loggedIn, activeFilters, detailsViolationGroup, searchTerm])
}

export default useUrlState
