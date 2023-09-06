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

// globals
export const useGlobalsEndpoint = () => useStore((s) => s.globals.endpoint)
export const useGlobalsUrlStateKey = () =>
  useStore((s) => s.globals.urlStateKey)
export const useGlobalShowModal = () => useStore((s) => s.globals.showModal)
export const useGlobalsActions = () => useStore((s) => s.globals.actions)

export default StoreProvider
