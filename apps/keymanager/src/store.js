import React from "react"
import create from "zustand"
import {devtools} from "zustand/middleware"


// global zustand store. See how this works here: https://github.com/pmndrs/zustand
const useStore = create(devtools((set) => ({
  newItemFormOpened:  false, // this is the state
  openNewItemForm:    () => set((state) => ({newItemFormOpened: true})),  // this is a reducer to change state
  closeNewItemForm:   () => set((state) => ({newItemFormOpened: false})), // this is a reducer to change state
})))

export default useStore