import produce from "immer"
import { countAlerts } from "./utils"

const createAlertsSlice = (set, get) => ({
  alerts: {
    items: [],
    itemsFiltered: [],
    totalCounts: {}, // { total: number, critical: number, ...},
    severityCountsPerRegion: {}, // {"eu-de-1": { total: number, critical: {total: number, suppressed: number}, warning: {...}, ...}
    regions: [], // save all available regions from initial list here
    regionsFiltered: [], // regions list filtered by active predefined filters
    enrichedLabels: [], // labels that are enriched by the alert worker
    isLoading: false,
    isUpdating: false,
    updatedAt: null,
    error: null,

    actions: {
      setAlertsData: ({ items, counts }) => {
        set(
          produce((state) => {
            state.alerts.items = items
            state.alerts.totalCounts = counts?.global
            state.alerts.severityCountsPerRegion = counts?.regions
            state.alerts.regions = Object.keys(counts?.regions).sort()
            state.alerts.isLoading = false
            state.alerts.isUpdating = false
            state.alerts.updatedAt = Date.now()

            // on the initial fetch copy all items to the filtered items list once since
            // most views operate on the filtered items list
            if (state.alerts.itemsFiltered.length === 0) {
              state.alerts.itemsFiltered = items
            }

            // same with the filtered regions list
            if (state.alerts.regionsFiltered.length === 0) {
              state.alerts.regionsFiltered = state.alerts.regions
            }

            // TODO:
            // reload previously loaded filter label values (they might have changed since last load)
            // state.filters.filterLabelValues = {} // -> do NOT just reset them, reload instead
          }),
          false,
          "alerts.setAlertsData"
        )
        // if there are already active filters or active predefined filters, filter the new list
        if (
          Object.keys(get().filters.activeFilters)?.length > 0 ||
          get().filters.activePredefinedFilter
        ) {
          get().alerts.actions.filterItems()
        }
      },

      filterItems: () => {
        const activePredefinedFilter = get().filters.predefinedFilters.find(
          (filter) => filter.name === get().filters.activePredefinedFilter
        )

        const filteredRegions = new Set()

        set(
          produce((state) => {
            state.alerts.itemsFiltered = state.alerts.items.filter((item) => {
              let visible = true

              // test if item labels match the regex matchers of the active predefined filter
              // for each key and value pair in the filter matchers check if the key's value regex matches the item's label value for this key
              // if it doesn't match, set visible to false and break out of the loop
              activePredefinedFilter &&
                Object.entries(activePredefinedFilter.matchers).forEach(
                  ([key, value]) => {
                    if (!new RegExp(value, "i").test(item.labels[key])) {
                      visible = false
                      return
                    } else {
                      // if the item is visible, add the item's region to the filtered regions set
                      // this way the filtered Regions set will contain all regions that have at least one visible item
                      filteredRegions.add(item.labels.region)
                    }
                  }
                )

              // if the item is still visible after the predefined filters, check if it gets filtered out by the active filters
              // active filters is an object where the keys correspond to labels and the value is an array of all selected values to be filtered by
              // iterate over all active filter keys and then check if one of the selected values matches the item's value for this key
              if (visible) {
                Object.keys(state.filters.activeFilters).forEach((key) => {
                  // if the item's label value for the current label isn't included in the selected filters set visible to false, i.e. filter out item
                  // this automatically leads to different values for the same label to be OR concatenated, while different labels are AND concatenated
                  // so an item must have at least one of the selected values for each filtered label
                  if (
                    state.filters.activeFilters[key].indexOf(item.labels[key]) <
                    0
                  ) {
                    // we can break out of the loop here since we already know the item is not visible
                    visible = false
                    return
                  }
                })
              }

              // if the item is still visible check if it gets filtered out by a search term
              // the search term is matched against the stringified item object
              // if the item object does not contain the search term, it is not visible
              if (
                visible &&
                state.filters.searchTerm &&
                state.filters.searchTerm.length > 0
              ) {
                const itemString = JSON.stringify(item).toLowerCase()
                if (
                  !itemString.includes(state.filters.searchTerm.toLowerCase())
                ) {
                  visible = false
                }
              }

              return visible
            })
          }),
          false,
          "alerts.filterItems"
        )
        get().alerts.actions.updateFilteredCounts()
        if (filteredRegions.size > 0) {
          get().alerts.actions.setRegionsFiltered(
            Array.from(filteredRegions).sort()
          )
        } else {
          // if nothing was filtered out, set the filtered regions to all available regions
          get().alerts.actions.setRegionsFiltered(get().alerts.regions)
        }
      },

      setFilteredItems: (items) => {
        set(
          produce((state) => {
            state.alerts.itemsFiltered = items
          }),
          false,
          "alerts.setFilteredItems"
        )
        get().alerts.actions.updateFilteredCounts()
      },

      setRegionsFiltered: (regions) => {
        set(
          produce((state) => {
            state.alerts.regionsFiltered = regions
          }),
          false,
          "alerts.setRegionsFiltered"
        )
      },

      updateFilteredCounts: () => {
        const counts = countAlerts(get().alerts.itemsFiltered)
        set(
          produce((state) => {
            state.alerts.totalCounts = counts.global
            state.alerts.severityCountsPerRegion = counts.regions
          }),
          false,
          "alerts.updateFilteredCounts"
        )
      },

      setIsLoading: (value) => {
        set(
          (state) => ({ alerts: { ...state.alerts, isLoading: value } }),
          false,
          "alerts.setIsLoading"
        )
      },

      setIsUpdating: (value) => {
        set(
          (state) => ({ alerts: { ...state.alerts, isUpdating: value } }),
          false,
          "alerts.setIsUpdating"
        )
      },

      setEnrichedLabels: (labels) => {
        set(
          (state) => {
            if (!labels || typeof labels !== "string") return state
            const newEnrichedLabels = labels.split(",")
            return {
              alerts: { ...state.alerts, enrichedLabels: newEnrichedLabels },
            }
          },
          false,
          "alerts.setEnrichedLabels"
        )
      },

      getAlertByFingerprint: (fingerprint) => {
        return get().alerts.items.find(
          (alert) => alert.fingerprint === fingerprint
        )
      },
    },
  },
})

export default createAlertsSlice
