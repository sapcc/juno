import { createStore } from "zustand"
import { devtools } from "zustand/middleware"

export default (options) =>
  createStore(
    devtools((set, get) => ({
      isUrlStateSetup: false,
      queryClientFnReady: false,
      endpoint: options?.apiEndpoint,

      actions: {
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
