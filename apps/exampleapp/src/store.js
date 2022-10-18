import React from "react"
import create from "zustand"
import {devtools} from "zustand/middleware"


// global zustand store. See how this works here: https://github.com/pmndrs/zustand
const useStore = create(devtools((set) => ({
  editItemPanelOpened:  false, // state of the edit panel
  openEditItemPanel:    () => set((state) => ({editItemPanelOpened: true})),
  closeEditItemPanel:   () => set((state) => ({editItemPanelOpened: false})),
  newItemModalOpenend:  false, // state of the new item modal
  openNewItemModal:     () => set((state) => ({newItemModalOpened: true})),
  closeNewItemModal:    () => set((state) => ({newItemModalOpened: false})),
})))

export default useStore