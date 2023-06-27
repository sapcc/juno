import produce from "immer"

const initialSilencesState = {
  items: [],
  itemsHash: {},
  itemsByState: {},
  excludedLabels: [],
  excludedLabelsHash: {},
  isLoading: false,
  isUpdating: false,
  updatedAt: null,
  error: null,
  localItems: {},
}

const createSilencesSlice = (set, get) => ({
  silences: {
    ...initialSilencesState,
    actions: {
      setSilences: ({ items, itemsHash, itemsByState }) => {
        if (!items) return

        set(
          produce((state) => {
            state.silences.items = items
            state.silences.itemsHash = itemsHash
            state.silences.itemsByState = itemsByState
            state.silences.isLoading = false
            state.silences.isUpdating = false
            state.silences.updatedAt = Date.now()
          }),
          false,
          "silences.setSilencesData"
        )

        // check if any local item can be removed
        get().silences.actions.updateLocalItems()
      },
      /* 
      Save temporary created silences to be able to display which alert is silenced
      and who silenced it until the next alert fetch contains the silencedBy reference
      */
      addLocalItem: ({ silence, id, alertFingerprint }) => {
        // enforce silences with id and alertFingerprint
        if (!silence || !id || !alertFingerprint) return
        return set(
          produce((state) => {
            state.silences.localItems = {
              ...get().silences.localItems,
              [id]: {
                ...silence,
                id,
                alertFingerprint,
                type: "local",
              },
            }
          }),
          false,
          "silences.addLocalItem"
        )
      },
      /*
      Remove local silences which are already referenced by an alert
      */
      updateLocalItems: () => {
        const allSilences = get().silences.itemsHash
        let newLocalSilences = { ...get().silences.localItems }
        Object.keys(newLocalSilences).forEach((key) => {
          const alert = get().alerts.actions.getAlertByFingerprint(
            newLocalSilences[key]?.alertFingerprint
          )

          // check if the alert has already the silence reference and if the extern silence already exists
          const silencedBy = alert?.status?.silencedBy
          if (
            silencedBy?.length > 0 &&
            silencedBy?.includes(newLocalSilences[key]?.id) &&
            allSilences[key]
          ) {
            // mark to remove silence
            newLocalSilences[key] = { ...newLocalSilences[key], remove: true }
          }
        })

        // remove silences marked to remove
        const reducedLocalSilences = Object.keys(newLocalSilences)
          .filter((key) => !newLocalSilences[key]?.remove)
          .reduce((obj, key) => {
            obj[key] = newLocalSilences[key]
            return obj
          }, {})

        return set(
          produce((state) => {
            state.silences.localItems = reducedLocalSilences
          }),
          false,
          "silences.updateLocalItems"
        )
      },
      /* 
      Given an alert fingerprint, this function returns all silences referenced by silencingBy. It also 
      check if there are local silences with the same alert fingerprint and return them as well.
      */
      getMappingSilences: (alert) => {
        if (!alert) return
        const externalSilences = get().silences.itemsHash
        let silencedBy = alert?.status?.silencedBy || []

        // ensure silencedBy is an array
        if (!Array.isArray(silencedBy)) silencedBy = [silencedBy]
        let mappingSilences = []
        silencedBy.forEach((id) => {
          if (externalSilences[id]) {
            mappingSilences.push(externalSilences[id])
          }
        })

        // add local silences
        let localSilences = get().silences.localItems
        Object.keys(localSilences).forEach((silenceID) => {
          // if there is already a silence with the same id, skip it and exists as external silence
          if (silencedBy.includes(silenceID) && externalSilences[silenceID])
            return
          // if the local silence has the same alert fingerprint, add it to the mapping silences
          if (
            localSilences[silenceID]?.alertFingerprint === alert?.fingerprint
          ) {
            mappingSilences.push(localSilences[silenceID])
          }
        })
        return mappingSilences
      },
      /*
      Return the state of an alert. If the alert is silenced by a local silence, the state is suppressed (processing)
      */
      getMappedState: (alert) => {
        if (!alert) return
        // get all silences (local and external)
        const silences = get().silences.actions.getMappingSilences(alert)
        // if there is a silence with type local, return suppressed (processing)
        if (silences?.find((silence) => silence?.type === "local")) {
          return { type: "suppressed", isProcessing: true }
        }
        return { type: alert?.status?.state, isProcessing: false }
      },
      setExcludedLabels: (labels) => {
        if (!labels) return

        // labels to hash object to easier access
        const labelsHash = labels.reduce((map, label) => {
          map[label] = label
          return map
        }, {})

        return set(
          (state) => ({
            silences: {
              ...state.silences,
              excludedLabels: labels,
              excludedLabelsHash: labelsHash,
            },
          }),
          false,
          "silences.setExcludedLabels"
        )
      },
      /*
      Find all silences in itemsByState with key expired that matches all labels (key&value) from the alert
      */
      getExpiredSilences: (alert) => {
        if (!alert) return
        const { labels } = alert
        const silences = get().silences.itemsByState?.expired || []

        return silences.filter((silence) => {
          const silenceMatchers = silence?.matchers || []
          // The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
          return silenceMatchers.every((matcher) => {
            return labels[matcher.name] === matcher.value
          })
        })
      },
      setIsLoading: (value) =>
        set(
          (state) => ({ silences: { ...state.silences, isLoading: value } }),
          false,
          "silences.setIsLoading"
        ),
      setIsUpdating: (value) =>
        set(
          (state) => ({
            silences: { ...state.silences, isUpdating: value },
          }),
          false,
          "silences.setIsUpdating"
        ),
    },
    advanced: {
      resetSlice: () =>
        set(
          (state) => ({
            silences: { ...state.silences, ...initialSilencesState },
          }),
          false,
          "silences.resetSilencesState"
        ),
    },
  },
})

export default createSilencesSlice
