import React from "react"
import create from "zustand"
import {devtools} from "zustand/middleware"

import { Peaks } from "./data"

// global zustand store. See how this works here: https://github.com/pmndrs/zustand
const useStore = create(devtools((set) => ({
  // Peaks data
  peaks: Peaks,//init with data from file

  
  // Panels and Modals:
  editItemPanelOpened:  false, // state of the edit panel
  openEditItemPanel:    () => set((state) => ({editItemPanelOpened: true})),
  closeEditItemPanel:   () => set((state) => ({editItemPanelOpened: false})),
  newItemModalOpenend:  false, // state of the new item modal
  openNewItemModal:     () => set((state) => ({newItemModalOpened: true})),
  closeNewItemModal:    () => set((state) => ({newItemModalOpened: false})),
})))

export default useStore