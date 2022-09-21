import React from "react"
import create from "zustand"
import createContext from "zustand/context"
import { devtools } from "zustand/middleware"
import uniqueId from "lodash.uniqueid"

// good example
// https://codesandbox.io/s/ivanyur4enk0-zustand-createcontext-issue-forked-x7m2f?file=/src/TestContext.js:377-389

const { Provider, useStore } = createContext()

export const SEARCH_STRING_TYPE = "string"
export const SEARCH_BOOL_TYPE = "bool"
export const SEARCH_ARRAY_TYPE = "[string]"

// custom store for the selected filters
const initialStore = (filterTypes) => {
  return create(
    devtools((set) => ({
      filterTypes: filterTypes || {},
      filters: [], // this is the initial state
      addFilter: (key, value) => addFilter(set, key, value),
      removeFilter: (key, value) => removeFilter(set, key, value),
    }))
  )
}

const addFilter = (set, key, value) =>
  set((state) => {
    // prevent to add duplicates
    const index = state.filters.findIndex(
      (item) => item.key === key && item.value === value
    )
    if (index >= 0) return state

    // if key type is string or boolean do not add more than 1 filter, overwrite existing
    if (
      state.filterTypes[key] === SEARCH_STRING_TYPE ||
      state.filterTypes[key] === SEARCH_BOOL_TYPE
    ) {
      const newFilters = state.filters.slice()
      const foundItem = newFilters.find((element) => element.key === key)
      if (foundItem) {
        foundItem.value = value
        return { ...state, filters: newFilters }
      }
    }
    // add entry
    let newFilters = state.filters
      .slice()
      .concat({ uid: uniqueId("filter-"), key: key, value: value })
    // sort entries
    newFilters.sort((a, b) => a.key.localeCompare(b.key))
    return { ...state, filters: newFilters }
  })

const removeFilter = (set, uid) =>
  set((state) => {
    let newItems = state.filters.slice()
    const index = newItems.findIndex((item) => item.uid === uid)
    // if NOT found return
    if (index < 0) return state

    newItems.splice(index, 1)
    return { ...state, filters: newItems }
  })

export const FilterToolbarStateProvider = ({ filterTypes, children }) => {
  return (
    <Provider createStore={() => initialStore(filterTypes)}>
      {children}
    </Provider>
  )
}

export { useStore }
