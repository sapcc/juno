import React, { useCallback } from "react"

import { Panel, PanelBody } from "juno-ui-components"
import NewItemFormFooter from "./NewItemFormFooter"
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


  return (
    <Panel heading="Panel Title" opened={panelOpened} onClose={closeNewItemForm}>
      <PanelBody footer={<NewItemFormFooter />}>
        <div>Panel Content here</div>
      </PanelBody>

    </Panel>
  )
}

export default NewItemForm