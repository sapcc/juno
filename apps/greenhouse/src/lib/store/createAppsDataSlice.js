const createAppsDataSlice = (set, get) => ({
  apps: {
    active: [],
    config: {},
    isFetching: false,
    error: null,
    updatedAt: null,
    actions: {
      setActive: (active) =>
        set(
          (state) => {
            if (!Array.isArray(active)) active = [active]
            // if the current state is the same as the new state, don't update
            // it prevents an unnecessary re-render
            if (JSON.stringify(state.apps.active) === JSON.stringify(active))
              return state
            return { apps: { ...state.apps, active } }
          },
          false,
          "apps/setActive"
        ),
      addActive: (appName) =>
        set(
          (state) => {
            const index = state.apps.active.findInde((i) => i === appName)
            if (index >= 0) return state
            const newActive = state.apps.active.slice()
            newActive.push(appName)
            return { apps: { ...state.apps, active: newActive } }
          },
          false,
          "apps/addActive"
        ),
      removeActive: (appName) =>
        set(
          (state) => {
            const index = state.apps.active.findInde((i) => i === appName)
            if (index < 0) return state
            let newActive = state.apps.active.slice()
            newActive.splice(index, 1)
            return { apps: { ...state.apps, active: newActive } }
          },
          false,
          "apps/removeActive"
        ),
      requestConfig: () =>
        set(
          (state) => ({ apps: { ...state.apps, isFetching: true } }),
          false,
          "apps/requestConfig"
        ),
      receiveConfig: (config) =>
        set((state) => ({
          apps: {
            ...state.apps,
            config,
            isFetching: false,
            error: null,
            updatedAt: Date.now(),
          },
        })),
      receiveConfigError: (error) =>
        set((state) => ({
          apps: {
            ...state.apps,
            isFetching: false,
            error,
          },
        })),
    },
  },
})

export default createAppsDataSlice
