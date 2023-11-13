import React, { createContext, useContext } from "react"
import { useStore as create } from "zustand"
import createStore from "../lib/store"
import Plugin from "../lib/plugin"

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
export const usePlugin = Plugin(useStore)

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
