import React from "react"
import create from "zustand"
import {devtools} from "zustand/middleware"


// global zustand store. See how this works here: https://github.com/pmndrs/zustand
const useStore = create(devtools((set) => ({
  newItemFormOpened:    false, // this is the state
  openNewItemForm:      () => set((state) => ({newItemFormOpened: true})),  // this is a reducer to change state
  closeNewItemForm:     () => set((state) => ({newItemFormOpened: false})), // this is a reducer to change state
  editItemPanelOpened:  false, // state of the edit panel
  openEditItemPanel:    () => set((state) => ({editItemPanelOpened: true})),
  closeEditItemPanel:   () => set((state) => ({editItemPanelOpened: false})),
  newItemModalOpenend:  false, // state of the new item modal
  openNewItemModal:     () => set((state) => ({newItemModalOpened: true})),
  closeNewItemModal:    () => set((state) => ({newItemModalOpened: false})),
})))

export default useStore