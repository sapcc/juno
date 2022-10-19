import React, { useCallback } from "react"

import { Modal, Button, TextInputRow } from "juno-ui-components"
import useStore from "../store"

const NewItemModal = () => {
  
  const handleCloseClick = () => {
    closeNewItemModal()
  }

  const closeNewItemModal = useStore(
    useCallback((state) => state.closeModal)
  )
  
  return (
    <Modal title="Add a New Peak" open onCancel={handleCloseClick} confirmButtonLabel="Save New Peak" >
      <TextInputRow label="Name"/>
      <TextInputRow label="Height"/>
      <TextInputRow label="Main Range" />
      <TextInputRow label="Region" />
      <TextInputRow label="Country" />
      <TextInputRow type="url" label="URL" />
    </Modal>
  )
  
}

export default NewItemModal