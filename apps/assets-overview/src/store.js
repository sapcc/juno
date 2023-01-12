import create from "zustand"
import { devtools } from "zustand/middleware"

// global zustand store. See how this works here: https://github.com/pmndrs/zustand
const useStore = create(
  devtools((set) => ({
    manifestUrl: "",
    setManifestUrl: (newUrl) => set((state) => ({ manifestUrl: newUrl })),
    urlStateKey: "",
    setUrlStateKey: (newUrlStateKey) =>
      set((state) => ({ urlStateKey: newUrlStateKey })),
  }))
)

export default useStore
