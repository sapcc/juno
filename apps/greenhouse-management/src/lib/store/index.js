import { createStore } from "zustand"
import { devtools } from "zustand/middleware"

export default (apiEndpoint) =>
  createStore(
    devtools((set, get) => ({
      isUrlStateSetup: false,
      assetsUrl: null,
      pluginConfig: {
        clusters: {
          label: "Clusters",
          name: "greenhouse-cluster-admin",
          props: { endpoint: apiEndpoint, embedded: true },
        },
        plugins: {
          label: "Plugins",
          name: "greenhouse-plugin-admin",
          props: { embedded: true },
        },
        teams: {
          label: "Teams",
          name: "greenhouse-team-admin",
          props: { endpoint: apiEndpoint, embedded: true },
        },
      },
      pluginActive: "greenhouse-cluster-admin", // name of the active plugin default

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
