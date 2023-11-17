import { createStore } from "zustand"
import { devtools } from "zustand/middleware"
import createAuthDataSlice from "./createAuthDataSlice"
import createGlobalsSlice from "./createGlobalsSlice"
import Plugin, { createPluginConfig, NAV_TYPES } from "../plugin"

export const initialPluginState = (environment) => ({
  active: [],
  config: {
    [`greenhouse-management`]: createPluginConfig({
      id: "greenhouse-management",
      name: "greenhouse-management",
      displayName: "Organization",
      navType: NAV_TYPES.MNG,
      navigable: environment !== "production",
    }),
  },
  appConfig: [], // kube app configs
  mngConfig: [], // management app configs
  isFetching: false,
  error: null,
  updatedAt: null,
})

export default (environment) => {
  const store = createStore(
    devtools((set, get) => ({
      ...createAuthDataSlice(set, get),
      ...createGlobalsSlice(set, get),
      plugin: {
        ...initialPluginState(environment),
      },
    }))
  )

  const plugin = Plugin(store)

  return { store, plugin }
}
