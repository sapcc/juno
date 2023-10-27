import React, { createContext, useContext } from "react"
import { useStore as create } from "zustand"
import createStore from "../lib/store"

const StoreContext = createContext()
const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={createStore()}>
    {children}
  </StoreContext.Provider>
)

const useStore = (selector) => create(useContext(StoreContext), selector)

// AUTH
export const useAuthData = () => useStore((s) => s.auth.data)
export const useAuthIsProcessing = () => useStore((s) => s.auth.isProcessing)
export const useAuthLoggedIn = () => useStore((s) => s.auth.loggedIn)
export const useAuthError = () => useStore((s) => s.auth.error)
export const useAuthLastAction = () => useStore((s) => s.auth.lastAction)
export const useAuthAppLoaded = () => useStore((s) => s.auth.appLoaded)
export const useAuthAppIsLoading = () => useStore((s) => s.auth.appIsLoading)
export const useAuthActions = () => useStore((s) => s.auth.actions)

// APPS
export const useAppsActive = () => useStore((s) => s.apps.active)
export const useAppsConfig = () => useStore((s) => s.apps.config)
export const useAppsActions = () => useStore((s) => s.apps.actions)
export const useAppsIsFetching = () => useStore((s) => s.apps.isFetching)
export const useAppsError = () => useStore((s) => s.apps.error)
export const useAppsUpdatedAt = () => useStore((s) => s.apps.updatedAt)

// GLOBAL
export const useGlobalsApiEndpoint = () =>
  useStore((s) => s.globals.apiEndpoint)
export const useGlobalsAssetsHost = () => useStore((s) => s.globals.assetsHost)
export const useGlobalsIsUrlStateSetup = () =>
  useStore((state) => state.globals.isUrlStateSetup)
export const useGlobalsActions = () => useStore((s) => s.globals.actions)
export const useDemoMode = () => useStore((s) => s.globals.demoMode)
export const useDemoUserToken = () => useStore((s) => s.globals.demoUserToken)

export default StoreProvider
