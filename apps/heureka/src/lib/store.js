import { createStore } from "zustand"
import { devtools } from "zustand/middleware"

export default (options) =>
  createStore(
    devtools((set, get) => ({
      isUrlStateSetup: false,
      queryClientFnReady: false,
      endpoint: options?.apiEndpoint,
      tabIndex: "0",

      actions: {
        setQueryClientFnReady: (readiness) =>
          set(
            (state) => {
              state.queryClientFnReady = readiness
            },
            false,
            "setQueryClientFnReady"
          ),
        setTabIndex: (index) =>
          set(
            (state) => {
              state.tabIndex = index
            },
            false,
            "setTabIndex"
          ),
      },
    }))
  )
