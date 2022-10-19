import React, { useCallback } from "react"
import useStore from "../store"
import LogInModal from "./LogInModal"
import NewItemModal from "./NewItemModal"


const ModalManager = ({

}) => {
  
  const currentModal = useStore((state) => state.currentModal)
  
  switch (currentModal) {
    case "LogIn":
      return <LogInModal />
    case "NewPeaksItem":
      return <NewItemModal />
    default:
      return null
  }
}

export default ModalManager