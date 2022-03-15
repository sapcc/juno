import React, { useCallback } from "react"

import { Button, Panel, PanelBody, PanelFooter } from "juno-ui-components"
import useStore from "../store"

const NewItemFormFooter = () => {

  // call close reducer from global store
  const closeNewItemForm = useStore(
    useCallback((state) => state.closeNewItemForm)
  )

  return (
    <PanelFooter>
      <Button 
        variant="subdued"
        onClick={closeNewItemForm}
      >
        Cancel
      </Button>
      <Button variant="primary">Do it</Button>
    </PanelFooter>
  )
}


const NewItemForm = () => {

  // get open/closed state from global store
  const panelOpened = useStore(
    useCallback((state) => state.newItemFormOpened)
  )

  // call close reducer from global store
  const closeNewItemForm = useStore(
    useCallback((state) => state.closeNewItemForm)
  )


  return (
    <Panel heading="Panel Title" opened={panelOpened} onClose={closeNewItemForm}>
      <PanelBody footer={<NewItemFormFooter />}>
        <div>Panel Content here</div>
      </PanelBody>

    </Panel>
  )
}

export default NewItemForm