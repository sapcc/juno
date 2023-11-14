import { createStore } from "zustand"
import { devtools } from "zustand/middleware"
import createAuthDataSlice from "./createAuthDataSlice"
import createAppsDataSlice from "./createAppsDataSlice"
import createGlobalsSlice from "./createGlobalsSlice"

export default () =>
  createStore(
    devtools((set, get) => ({
      ...createAuthDataSlice(set, get),
      ...createAppsDataSlice(set, get),
      ...createGlobalsSlice(set, get),
    }))
  )
