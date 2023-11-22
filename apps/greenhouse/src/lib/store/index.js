import { createStore } from "zustand"
import { devtools } from "zustand/middleware"
import createAuthDataSlice from "./createAuthDataSlice"
import createGlobalsSlice from "./createGlobalsSlice"
import Plugin from "../plugin"

export default (environment) => {
  const store = createStore(
    devtools((set, get) => ({
      ...createAuthDataSlice(set, get),
      ...createGlobalsSlice(set, get),
    }))
  )

  const plugin = Plugin(environment)

  return { store, plugin }
}
