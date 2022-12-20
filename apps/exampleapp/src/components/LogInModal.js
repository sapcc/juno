import React, { useCallback } from "react"

import { Modal, TextInputRow } from "juno-ui-components"
import useStore from "../store"

const LogInModal = () => {
  const handleCloseClick = () => {
    closeModal()
  }

  closeModal = useStore(useCallback((state) => state.closeModal))

  return (
    <Modal
      title="Log In"
      open
      onCancel={handleCloseClick}
      confirmButtonLabel="Log In"
    >
      <TextInputRow label="Username" />
      <TextInputRow label="Password" type="password" />
    </Modal>
  )
}

export default LogInModal
