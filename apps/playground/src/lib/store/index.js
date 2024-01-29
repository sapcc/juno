import { createStore } from "zustand"
import { devtools } from "zustand/middleware"

export default () => createStore(devtools((set, get) => ({})))
