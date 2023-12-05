import { createStore } from "zustand"
import { devtools } from "zustand/middleware"
import createAuthDataSlice from "./createAuthDataSlice"
import createGlobalsSlice from "./createGlobalsSlice"
import Plugin from "../plugin"

export default (options) => {
  const store = createStore(
    devtools((set, get) => ({
      ...createAuthDataSlice(set, get),
      ...createGlobalsSlice(set, get),
    }))
  )

  const plugin = Plugin(options)

  return { store, plugin }
}
