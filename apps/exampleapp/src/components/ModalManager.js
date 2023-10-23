import React from "react"
import { useGlobalsCurrentModal } from "./StoreProvider"
import TestModal from "./TestModal"

const ModalManager = () => {
  const currentModal = useGlobalsCurrentModal()

  switch (currentModal) {
    case "TestModal":
      return <TestModal />
    default:
      return null
  }
}

export default ModalManager
