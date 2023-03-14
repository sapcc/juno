import { create } from "zustand"

const ACTIONS = {
  SIGN_ON: "signOn",
  SIGN_OUT: "signOut",
}

const createUserActivitySlice = (set, get) => ({
  userActivity: {
    // this state tracks the user activity
    isActive: true,
    setIsActive: (activity) => {
      set((state) => ({
        userActivity: { ...state.userActivity, isActive: activity },
      }))
    },
    //this state tracks
    showInactiveModal: false,
    setShowInactiveModal: (activity) => {
      set((state) => ({
        userActivity: { ...state.userActivity, showInactiveModal: activity },
      }))
    },
  },
})

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
      set((state) => ({ apps: { ...state.apps, active } })),
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
  ...createUserActivitySlice(set, get),
  endpoint: "",
  urlStateKey: "",
  assetsHost: "",

  setEndpoint: (value) => set(() => ({ endpoint: value })),
  setUrlStateKey: (value) => set(() => ({ urlStateKey: value })),
  setAssetsHost: (value) => set(() => ({ assetsHost: value })),
}))

export default useStore
