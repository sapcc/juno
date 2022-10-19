import React from "react"
import create from "zustand"
import {devtools} from "zustand/middleware"

import { Peaks } from "./data"

// global zustand store. See how this works here: https://github.com/pmndrs/zustand
const useStore = create(devtools((set) => ({
  // Peaks data
  peaks: Peaks,//init with data from file
  
  // Panels and Modals:
  currentModal: null,
  setCurrentModal:      (modal) => set((state) => ({currentModal: modal})),
  closeModal:           () => set((state) => ({currentModal: null})),
  
  // OLD Panel:
  editItemPanelOpened:  false, // state of the edit panel
  openEditItemPanel:    () => set((state) => ({editItemPanelOpened: true})),
  closeEditItemPanel:   () => set((state) => ({editItemPanelOpened: false})),
})))

export default useStore