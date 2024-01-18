import { createStore } from "zustand"
import { devtools } from "zustand/middleware"

export default () =>
  createStore(
    devtools((set, get) => ({
      isUrlStateSetup: false,
      queryClientFnReady: false,
      endpoint: "",

      actions: {
        setEndpoint: (newEndpoint) =>
          set(
            (state) => {
              state.endpoint = newEndpoint
            },
            false,
            "setEndpoint"
          ),
        setQueryClientFnReady: (readiness) =>
          set(
            (state) => {
              state.queryClientFnReady = readiness
            },
            false,
            "globals.setQueryClientFnReady"
          ),
      },
    }))
  )
