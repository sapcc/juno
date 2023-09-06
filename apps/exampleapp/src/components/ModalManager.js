import React, { useState, useEffect } from "react"
import { currentState, addOnChangeListener } from "url-state-provider"
import LogInModal from "./LogInModal"
import NewItemModal from "./Peaks/NewItemModal"

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
