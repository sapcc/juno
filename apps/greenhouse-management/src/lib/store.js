import { createStore } from "zustand"
import { devtools } from "zustand/middleware"

const PLUGIN_CLUSTERS_VERSION = "1.5"
const PLUGIN_TEAMS_VERSION = "1.0"

export default (options) => {
  const isProd =
    options?.environment !== "qa" && options?.environment !== "development"

  return createStore(
    devtools((set, get) => ({
      isUrlStateSetup: false,
      assetsUrl: null,
      pluginConfig: {
        clusters: {
          label: "Clusters",
          name: "greenhouse-cluster-admin",
          props: { endpoint: options.apiEndpoint, embedded: true },
          ...(isProd && { version: PLUGIN_CLUSTERS_VERSION }),
        },
        teams: {
          label: "Teams",
          name: "greenhouse-team-admin",
          props: { endpoint: options.apiEndpoint, embedded: true },
          ...(isProd && { version: PLUGIN_TEAMS_VERSION }),
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
