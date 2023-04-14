import { create } from "zustand"
import { devtools } from "zustand/middleware"
import produce from "immer"
import { countAlerts } from "../lib/utils"

const createUserActivitySlice = (set, get) => ({
  userActivity: {
    isActive: true,

    actions: {
      setIsActive: (activity) => {
        set((state) => ({
          userActivity: { ...state.userActivity, isActive: activity },
        }))
      },
    }
  },
})

const createAlertsSlice = (set, get) => ({
  alerts: {
    items: [],
    itemsFiltered: [],
    totalCounts: {},
    severityCountsPerRegion: {},
    isLoading: false,
    updatedAt: null,

    actions: {
      setAlertsData: ({ items, counts }) =>
        set((state) => ({
          alerts: {
            ...state.alerts,
            items,
            totalCounts: counts?.global,
            severityCountsPerRegion: counts?.regions,
            isLoading: false,
            isUpdating: false,
            updatedAt: Date.now(),
          },
        })),
      
      filterItems: () => {
        set(
          produce((state) => {
            state.alerts.itemsFiltered = state.alerts.items.filter((item) => {
              let visible = true
              
              // active filters is an object where the keys correspond to labels and the value is an array of all selected values to be filtered by
              // iterate over all active filter keys and then check if one of the selected values matches the item's value for this key
              Object.keys(state.filters.activeFilters).forEach((key) => {
                // if the item's label value for the current label isn't included in the selected filters set visible to false, i.e. filter out item
                // this automatically leads to different values for the same label to be OR concatenated, while different labels are AND concatenated
                // so an item must have at least one of the selected values for each filtered label
                if (state.filters.activeFilters[key].indexOf(item.labels[key]) < 0) {
                  visible = false
                }
              })

              return visible
            })
          })
        )
        get().alerts.actions.updateFilteredCounts()
      },

      setFilteredItems: (items) => {
        set(
          produce((state) => {
            state.alerts.itemsFiltered = items
          })
        )
        get().alerts.actions.updateFilteredCounts()
      },

      updateFilteredCounts: () => {
        const counts = countAlerts(get().alerts.itemsFiltered)
        set(
          produce((state) => {
            state.alerts.totalCounts = counts.global
            state.alerts.severityCountsPerRegion = counts.regions
          })
        )
      },

      setIsLoading: (value) =>
        set((state) => ({ alerts: { ...state.alerts, isLoading: value } })),
      setIsUpdating: (value) =>
        set((state) => ({ alerts: { ...state.alerts, isUpdating: value } })),
    }
  },
})

const createFiltersSlice = (set, get) => ({
  filters: {
    labels: [], // labels to be used for filtering: [ "label1", "label2", "label3"]
    activeFilters: {}, // for each active filter key list the selected values: {key1: [value1], key2: [value2_1, value2_2], ...}
    
    actions: {
      setLabels: (labels) =>
        set((state) => {
          return {
            filters: {
              ...state.filters,
              labels,
            },
          }
        }),

      setActiveFilters: (activeFilters) =>
        set((state) => {
          return {
            filters: {
              ...state.filters,
              activeFilters
            }
          }
        }),

      addActiveFilter: (filterLabel, filterValue) => {
        set(
          produce((state) => {
            // use Set to prevent duplicate values
            state.filters.activeFilters[filterLabel] = [...new Set([...(state.filters.activeFilters[filterLabel] || []), filterValue])]
          })
        )
        // after adding a new filter key and value: filter items
        get().alerts.actions.filterItems()
      },

      removeActiveFilter: (filterLabel, filterValue) => {
        set(
          produce((state) => {
            state.filters.activeFilters[filterLabel] = state.filters.activeFilters[filterLabel].filter((value) => value !== filterValue)
            // if this was the last selected value delete the whole label key
            if (state.filters.activeFilters[filterLabel].length === 0) {
              delete state.filters.activeFilters[filterLabel]
            }
          })
        )
        // after removing a filter: filter items
        get().alerts.actions.filterItems()
      },
    }
  },
})

const useStore = create(
  devtools((set, get) => ({
    ...createAlertsSlice(set, get),
    ...createUserActivitySlice(set, get),
    ...createFiltersSlice(set, get),
    urlStateKey: "supernova",
  }))
)

// Store exports
export const useUrlStateKey                    = () => useStore((state) => state.urlStateKey)

// UserActivity exports
export const useUserIsActive                   = () => useStore((state) => state.userActivity.isActive)

export const useUserActivityActions            = () => useStore((state) => state.userActivity.actions)


// Alert exports
export const useAlertsItems                    = () => useStore((state) => state.alerts.items)
export const useAlertsItemsFiltered            = () => useStore((state) => state.alerts.itemsFiltered)
export const useAlertsTotalCounts              = () => useStore((state) => state.alerts.totalCounts)
export const useAlertsSeverityCountsPerRegion  = () => useStore((state) => state.alerts.severityCountsPerRegion)
export const useAlertsIsLoading                = () => useStore((state) => state.alerts.isLoading)
export const useAlertsUpdatedAt                = () => useStore((state) => state.alerts.updatedAt)

export const useAlertsActions                  = () => useStore((state) => state.alerts.actions)


// Filter exports
export const useFilterLabels                  = () => useStore((state) => state.filters.labels)
export const useActiveFilters                 = () => useStore((state) => state.filters.activeFilters)
export const useFilterActions                 = () => useStore((state) => state.filters.actions)
