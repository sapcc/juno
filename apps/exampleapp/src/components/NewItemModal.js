import React, { useCallback } from "react"

import { Modal, Button, TextInputRow } from "juno-ui-components"
import useStore from "../store"

const NewItemModal = () => {
  
  // get open/closed state from global store
  const modalOpened = useStore(
    useCallback((state) => state.newItemModalOpened)
  )
  
  // call close reducer from global store
  const closeNewItemModal = useStore(
    useCallback((state) => state.closeNewItemModal)
  )
  
  const saveNewItemModal = useStore(
    useCallback((state) => state.closeNewItemModal)
  )
  
  return (
    <Modal title="Add a New Peak" open={ modalOpened } onCancel={closeNewItemModal} onConfirm={saveNewItemModal} confirmButtonLabel="Save New Peak" >
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