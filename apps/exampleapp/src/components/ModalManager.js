import React, { useState, useEffect } from "react"
import useStore from "../store"
import { currentState, addOnChangeListener } from "url-state-provider"
import LogInModal from "./LogInModal"
import NewItemModal from "./NewItemModal"

const ModalManager = ({}) => {
  const urlStateKey = useStore((state) => state.urlStateKey)
  const [currentModal, setCurrentModal] = useState("")

  // wait until the global state is set to fetch the url state
  useEffect(() => {
    const urlState = currentState(urlStateKey)
    setCurrentModal(urlState?.currentModal)
  }, [urlStateKey])

  // this listener reacts on any change on the url state
  addOnChangeListener(urlStateKey, (newState) => {
    setCurrentModal(newState?.currentModal)
  })

  switch (currentModal) {
    case "LogIn":
      return <LogInModal />
    case "NewPeaksItem":
      return <NewItemModal />
    case "EditPeaksItem":
      return <NewItemModal />
    default:
      return null
  }
}

export default ModalManager
