import React from "react"
import create from "zustand"
import { devtools } from "zustand/middleware"

// global zustand store. See how this works here: https://github.com/pmndrs/zustand
const useStore = create(
  devtools((set) => ({
    endpoint: "", // this is the state
    setEndpoint: (endpoint) => set((state) => ({ endpoint: endpoint })),
    auth: null,
    setAuth: (auth) => set((state) => ({ auth: auth })),
  }))
)

export default useStore
