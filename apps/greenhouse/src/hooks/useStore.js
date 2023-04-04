import { create } from "zustand"

const ACTIONS = {
  SIGN_ON: "signOn",
  SIGN_OUT: "signOut",
}

const createAuthDataSlice = (set, get) => ({
  auth: {
    data: null,
    isProcessing: false,
    loggedIn: false,
    error: null,
    lastAction: {},
    appLoaded: false,
    appIsLoading: false,
    setAppLoaded: (appLoaded) => {
      set((state) => ({ auth: { ...state.auth, appLoaded } }))
    },
    setData: (data) => {
      set((state) => ({
        auth: {
          ...state.auth,
          isProcessing: data.isProcessing,
          loggedIn: data.loggedIn,
          error: data.error,
          data: data.auth,
        },
      }))
    },
    setAction: (name) =>
      set((state) => ({
        auth: {
          ...state.auth,
          lastAction: { name: name, updatedAt: Date.now() },
        },
      })),
    login: () => get().auth.setAction(ACTIONS.SIGN_ON),
    logout: () => get().auth.setAction(ACTIONS.SIGN_OUT),
  },
})

const createAppsDataSlice = (set, get) => ({
  apps: {
    active: [],
    config: {},
    setActive: (active) =>
      set((state) => {
        if (!Array.isArray(active)) active = [active]
        return { apps: { ...state.apps, active } }
      }),
    addActive: (appName) =>
      set((state) => {
        const index = state.apps.active.findInde((i) => i === appName)
        if (index >= 0) return state
        const newActive = state.apps.active.slice()
        newActive.push(appName)
        return { apps: { ...state.apps, active: newActive } }
      }),
    removeActive: (appName) =>
      set((state) => {
        const index = state.apps.active.findInde((i) => i === appName)
        if (index < 0) return state
        let newActive = state.apps.active.slice()
        newActive.splice(index, 1)
        return { apps: { ...state.apps, active: newActive } }
      }),
    setConfig: (config) =>
      set((state) => ({ apps: { ...state.apps, config } })),
  },
})
// global zustand store. See how this works here: https://github.com/pmndrs/zustand
const useStore = create((set, get) => ({
  ...createAuthDataSlice(set, get),
  ...createAppsDataSlice(set, get),
  apiEndpoint: "",
  assetsHost: "",

  setApiEndpoint: (value) => set(() => ({ apiEndpoint: value })),
  setAssetsHost: (value) => set(() => ({ assetsHost: value })),
}))

export default useStore
