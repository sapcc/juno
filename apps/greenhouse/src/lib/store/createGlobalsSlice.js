const initialGlobalsState = {
  apiEndpoint: "",
  assetsHost: "",
  isUrlStateSetup: false,
  demoMode: false,
  demoUserToken: null,
}

const createGlobalsSlice = (set, get) => ({
  globals: {
    ...initialGlobalsState,
    actions: {
      setDemoMode: (demoMode) =>
        set((state) => ({ globals: { ...state.globals, demoMode } })),
      setDemoUserToken: (demoUserToken) =>
        set((state) => ({ globals: { ...state.globals, demoUserToken } })),

      setApiEndpoint: (value) =>
        set(
          (state) => ({ globals: { ...state.globals, apiEndpoint: value } }),
          false,
          "globals/setApiEndpoint"
        ),
      setAssetsHost: (value) =>
        set(
          (state) => ({ globals: { ...state.globals, assetsHost: value } }),
          false,
          "globals/setAssetsHost"
        ),
      setIsUrlStateSetup: (setup) =>
        set(
          (state) => ({
            globals: { ...state.globals, isUrlStateSetup: setup },
          }),
          false,
          "globals/setIsUrlStateSetup"
        ),
    },
  },
})

export default createGlobalsSlice
