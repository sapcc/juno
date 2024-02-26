import { createStore } from "zustand"
import { devtools } from "zustand/middleware"

export default (options) =>
  createStore(
    devtools((set, get) => ({
      theme: options?.theme || "theme-dark",
    }))
  )
