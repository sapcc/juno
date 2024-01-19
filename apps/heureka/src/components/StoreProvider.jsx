import React, { createContext, useContext } from "react"
import { useStore as create } from "zustand"
import createStore from "../lib/store"

const StoreContext = createContext()
const StoreProvider = ({ options, children }) => (
  <StoreContext.Provider value={createStore(options)}>
    {children}
  </StoreContext.Provider>
)

const useStore = (selector) => create(useContext(StoreContext), selector)

export const useEndpoint = () => useStore((s) => s.endpoint)
export const useQueryClientFnReady = () => useStore((s) => s.queryClientFnReady)
export const useActions = () => useStore((s) => s.actions)

export default StoreProvider
