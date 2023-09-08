import React, { useCallback } from "react"

import { Modal, FormRow, TextInput } from "juno-ui-components"
import { useGlobalsActions } from "./StoreProvider"

const LogInModal = () => {
  const { setCurrentModal } = useGlobalsActions()

  const handleCloseClick = () => {
    setCurrentModal(null)
  }

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
