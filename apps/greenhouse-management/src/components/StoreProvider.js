import React, { createContext, useContext } from "react"
import { useStore as create } from "zustand"
import createStore from "../lib/store"

const StoreContext = createContext()
const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={createStore()}>
    {children}
  </StoreContext.Provider>
)

const useAppStore = (selector) => create(useContext(StoreContext), selector)

export const useIsUrlStateSetup = () =>
  useAppStore((state) => state.isUrlStateSetup)
export const useApiEndpoint = () => useAppStore((state) => state.apiEndpoint)
export const useAssetsUrl = () => useAppStore((state) => state.assetsUrl)
export const usePluginConfig = () => useAppStore((state) => state.pluginConfig)
export const usePluginActive = () => useAppStore((state) => state.pluginActive)

export const useActions = () => useAppStore((state) => state.actions)

export default StoreProvider
