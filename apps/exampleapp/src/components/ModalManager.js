import React from "react"
import { useGlobalsCurrentModal } from "./StoreProvider"
import LogInModal from "./LogInModal"

const ModalManager = () => {
  const currentModal = useGlobalsCurrentModal()

  switch (currentModal) {
    case "LogIn":
      return <LogInModal />
    default:
      return null
  }
}

export default ModalManager
