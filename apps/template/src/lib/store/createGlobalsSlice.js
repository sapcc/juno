const createGlobalsSlice = (set, get) => ({
  globals: {
    urlStateKey: "",

    actions: {
      setUrlStateKey: (newUrlStateKey) =>
        set((state) => ({
          globals: { ...state.globals, urlStateKey: newUrlStateKey },
        })),
    },
  },
})

export default createGlobalsSlice
