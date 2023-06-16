import produce from "immer"

const createSilencesSlice = (set, get) => ({
  silences: {
    items: [],
    itemsHash: {},
    isLoading: false,
    isUpdating: false,
    updatedAt: null,
    error: null,

    actions: {
      setSilences: ({ items }) => {
        if (!items) return

        // remove duplicates
        const newItems = items.filter(
          (item, index) => items.findIndex((i) => i.id === item.id) === index
        )

        // convert to hash for faster access
        const hash = newItems.reduce((hash, silence) => {
          hash[silence.id] = silence
          return hash
        })

        set(
          produce((state) => {
            state.silences.items = newItems
            state.silences.itemsHash = hash
            state.silences.isLoading = false
            state.silences.isUpdating = false
            state.silences.updatedAt = Date.now()
          }),
          false,
          "silences.setSilencesData"
        )
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
  },
})

export default createSilencesSlice
