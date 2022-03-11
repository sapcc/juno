import React, { useCallback } from "react"

import { Button, Panel, PanelBody, PanelFooter } from "juno-ui-components"
import useStore from "../store"


const NewItemForm = () => {

  // get open/closed state from global store
  const panelOpened = useStore(
    useCallback((state) => state.newItemFormOpened)
  )

  // call close reducer from global store
  const closeNewItemForm = useStore(
    useCallback((state) => state.closeNewItemForm)
  )

  const FormFooter = () => {
    return (
      <PanelFooter>
        <Button>Do it</Button>
      </PanelFooter>
    )
    }


  return (
    <Panel heading="Panel Title" opened={panelOpened} onClose={closeNewItemForm}>
      <PanelBody footer={<FormFooter />}>
        <div>Panel Content here</div>
      </PanelBody>

    </Panel>
  )
}

export default NewItemForm