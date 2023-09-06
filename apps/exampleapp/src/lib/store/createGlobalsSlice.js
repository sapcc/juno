const createGlobalsSlice = (set, get) => ({
  globals: {
    endpoint: "",
    urlStateKey: "",
    showModal: false,

    actions: {
      setEndpoint: (newEndpoint) =>
        set(
          (state) => ({
            globals: {
              ...state.globals,
              endpoint: newEndpoint,
            },
          }),
          false,
          "globals.setEndpoint"
        ),
      setUrlStateKey: (newUrlStateKey) =>
        set(
          (state) => ({
            globals: {
              ...state.globals,
              urlStateKey: newUrlStateKey,
            },
          }),
          false,
          "globals.setUrlStateKey"
        ),
      setShowModal: (showModal) =>
        set(
          (state) => ({
            globals: {
              ...state.globals,
              showModal,
            },
          }),
          false,
          "globals.showModal"
        ),
    },
  },
})

export default createGlobalsSlice
