import React, { useCallback } from "react"

import { Modal, FormRow, TextInput } from "juno-ui-components"
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
      <FormRow>
        <TextInput label="Username" />
      </FormRow>
      <FormRow>
        <TextInput label="Password" type="password" />
      </FormRow>
    </Modal>
  )
}

export default LogInModal
