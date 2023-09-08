const createGlobalsSlice = (set, get) => ({
  globals: {
    endpoint: "",
    queryClientFnReady: false,
    urlStateKey: "",
    tabIndex: 0,
    currentModal: null,
    currentPanel: null,

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
      setTabIndex: (newTabIndex) =>
        set(
          (state) => ({
            globals: {
              ...state.globals,
              tabIndex: newTabIndex,
            },
          }),
          false,
          "globals.setTabIndex"
        ),
      setCurrentModal: (newModal) =>
        set(
          (state) => ({
            globals: {
              ...state.globals,
              currentModal: newModal,
            },
          }),
          false,
          "globals.setCurrentModal"
        ),
      setCurrentPanel: (newPanel) =>
        set(
          (state) => ({
            globals: {
              ...state.globals,
              currentPanel: newPanel,
            },
          }),
          false,
          "globals.setCurrentPanel"
        ),
      setQueryClientFnReady: (readiness) =>
        set(
          (state) => ({
            globals: {
              ...state.globals,
              queryClientFnReady: readiness,
            },
          }),
          false,
          "globals.setQueryClientFnReady"
        ),
    },
  },
})

export default createGlobalsSlice
