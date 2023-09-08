import { createStore } from "zustand"
import { devtools } from "zustand/middleware"
import createGlobalsSlice from "./createGlobalsSlice"
import createAuthSlice from "./createAuthSlice"

export default () =>
  createStore(
    devtools((set, get) => ({
      ...createGlobalsSlice(set, get),
      ...createAuthSlice(set, get),
    }))
  )
