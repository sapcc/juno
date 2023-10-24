import { createStore } from "zustand"
import { devtools } from "zustand/middleware"

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

    actions: {
      setAppLoaded: (appLoaded) => {
        set(
          (state) => ({ auth: { ...state.auth, appLoaded } }),
          false,
          "auth/setAppLoaded"
        )
      },
      setData: (data = {}) => {
        set(
          (state) => ({
            auth: {
              ...state.auth,
              isProcessing: data ? data.isProcessing : false,
              loggedIn: data ? data.loggedIn : false,
              error: data ? data.error : null,
              data: data ? data.auth : null,
            },
          }),
          false,
          "auth/setData"
        )
        if (!data) get().auth.actions.setAction(ACTIONS.SIGN_OUT)
      },
      setAction: (name) =>
        set(
          (state) => ({
            auth: {
              ...state.auth,
              lastAction: { name: name, updatedAt: Date.now() },
            },
          }),
          false,
          "auth/setAction"
        ),
      login: () => {
        // logout
        get().auth.actions.setAction(ACTIONS.SIGN_OUT)
        get().auth.actions.setAction(ACTIONS.SIGN_ON)
      },
      logout: () => get().auth.actions.setAction(ACTIONS.SIGN_OUT),
    },
  },
})

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

const createGlobalsSlice = (set, get) => ({
  globals: {
    apiEndpoint: "",
    assetsHost: "",
    isUrlStateSetup: false,
    demoMode: false,
    demoUserToken: null,

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

export default () =>
  createStore(
    devtools((set, get) => ({
      ...createAuthDataSlice(set, get),
      ...createAppsDataSlice(set, get),
      ...createGlobalsSlice(set, get),
    }))
  )
