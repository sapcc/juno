import React, { useState } from "react"
import useStore from "../store"
import { currentState, addOnChangeListener } from "url-state-provider"
import LogInModal from "./LogInModal"
import NewItemModal from "./NewItemModal"

const ModalManager = ({}) => {
  const urlStateKey = useStore((state) => state.urlStateKey)
  const [currentModal, setCurrentModal] = useState("")

  // this listener reacts on any change on the url state
  addOnChangeListener(urlStateKey, (newState) => {
    setCurrentModal(newState?.currentModal)
  })

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
