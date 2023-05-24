import { create } from "zustand"

// global zustand store. See how this works here: https://github.com/pmndrs/zustand
const useStore = create((set) => ({
  manifestUrl: "",
  setManifestUrl: (newUrl) => set((state) => ({ manifestUrl: newUrl })),
  assetsUrl: "",
  setAssetsUrl: (newUrl) => set((state) => ({ assetsUrl: newUrl })),
  origin: "",
  setOrigin: (newOrigin) => set((state) => ({ origin: newOrigin })),
  embedded: "",
  setEmbedded: (embedded) => set((state) => ({ embedded: embedded })),
  urlStateKey: "assets-overview",
  urlStateTestingKey: "assets-overview-testing",
}))

export default useStore
