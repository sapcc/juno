import React, { useState, useEffect } from "react"
import useStore from "../store"
import { currentState, addOnChangeListener } from "url-state-provider"
import LogInModal from "./LogInModal"
import NewItemModal from "./NewItemModal"

const ModalManager = ({ currentModal }) => {
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
