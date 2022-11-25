import React from "react"
import create from "zustand"
import { devtools } from "zustand/middleware"

// global zustand store. See how this works here: https://github.com/pmndrs/zustand
const useStore = create(
  devtools((set) => ({
    // basics
    endpoint: "",
    setEndpoint: (newEndpoint) => set((state) => ({ endpoint: newEndpoint })),
    urlStateKey: "",
    setUrlStateKey: (newUrlStateKey) =>
      set((state) => ({ urlStateKey: newUrlStateKey })),

    // Panels and Modals:
    currentModal: null,
    setCurrentModal: (modal) => set((state) => ({ currentModal: modal })),
    closeModal: () => set((state) => ({ currentModal: null })),

    // OLD Panel:
    editItemPanelOpened: false, // state of the edit panel
    openEditItemPanel: () => set((state) => ({ editItemPanelOpened: true })),
    closeEditItemPanel: () => set((state) => ({ editItemPanelOpened: false })),
  }))
)

export default useStore
