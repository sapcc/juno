import React from "react"
import { useGlobalsCurrentModal } from "./StoreProvider"
import LogIn from "./auth/LogIn"

const ModalManager = () => {
  const currentModal = useGlobalsCurrentModal()

  switch (currentModal) {
    case "LogIn":
      return <LogIn />
    default:
      return null
  }
}

export default ModalManager
