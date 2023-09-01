const createGlobalsSlice = (set, get) => ({
  globals: {
    endpoint: "",
    urlStateKey: "",

    actions: {
      setEndpoint: (newEndpoint) =>
        set((state) => ({
          globals: { ...state.globals, endpoint: newEndpoint },
        })),
      setUrlStateKey: (newUrlStateKey) =>
        set((state) => ({
          globals: { ...state.globals, urlStateKey: newUrlStateKey },
        })),
    },
  },
})

export default createGlobalsSlice
