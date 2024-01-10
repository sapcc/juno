import { createStore } from "zustand"
import { devtools } from "zustand/middleware"

export default (options) => {
  const clustersVersion =
    options.environment === "qa" || options.environment === "development"
      ? "0.0.1-dev"
      : "1.5"
  return createStore(
    devtools((set, get) => ({
      isUrlStateSetup: false,
      assetsUrl: null,
      pluginConfig: {
        clusters: {
          label: "Clusters",
          name: "greenhouse-cluster-admin",
          version: clustersVersion,
          props: { endpoint: options.apiEndpoint, embedded: true },
        },
        // plugins: {
        //   label: "Plugins",
        //   name: "greenhouse-plugin-admin",
        //   props: { embedded: true },
        // },
        teams: {
          label: "Teams",
          name: "greenhouse-team-admin",
          props: { endpoint: options.apiEndpoint, embedded: true },
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
}
