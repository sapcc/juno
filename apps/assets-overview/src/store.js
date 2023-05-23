import { create } from "zustand"

// global zustand store. See how this works here: https://github.com/pmndrs/zustand
const useStore = create((set) => ({
  manifestUrl: "",
  setManifestUrl: (newUrl) => set((state) => ({ manifestUrl: newUrl })),
  assetsUrl: "",
  setAssetsUrl: (newUrl) => set((state) => ({ assetsUrl: newUrl })),
  origin: "",
  setOrigin: (newOrigin) => set((state) => ({ origin: newOrigin })),
  urlStateKey: "assets-overview",
}))

export default useStore
