import { createStore } from "zustand"
import { devtools } from "zustand/middleware"

export default () =>
  createStore(
    devtools((set, get) => ({
      isUrlStateSetup: false,
      apiEndpoint: null,
      assetsUrl: null,
      pluginConfig: {
        clusters: {
          label: "Clusters",
          name: "clusters",
          props: { embedded: true },
        },
        plugins: {
          label: "Plugins",
          name: "plugins",
          props: { embedded: true },
        },
        teams: {
          label: "Teams",
          name: "greenhouse-team-admin",
          props: { embedded: true },
        },
      },
      pluginActive: "clusters", // name of the active plugin default

      actions: {
        setPluginActive: (pluginId) =>
          set(
            (state) => {
              state.pluginActive = pluginId
            },
            false,
            "setPluginActive"
          ),
        setIsUrlStateSetup: (isSetup) =>
          set(
            (state) => {
              state.isUrlStateSetup = isSetup
            },
            false,
            "setIsUrlStateSetup"
          ),
        setApiEndpoint: (endpoint) =>
          set(
            (state) => {
              state.apiEndpoint = endpoint
            },
            false,
            "setApiEndpoint"
          ),
        setAssetsUrl: (url) =>
          set(
            (state) => {
              state.assetsUrl = url
            },
            false,
            "setAssetsUrl"
          ),
      },
    }))
  )
