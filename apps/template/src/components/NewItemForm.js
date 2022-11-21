import React, { useState, useEffect } from "react"

import { Button, Panel, PanelBody, PanelFooter } from "juno-ui-components"
import useStore from "../store"
import { currentState, push, addOnChangeListener } from "url-state-provider"

const NewItemFormFooter = ({ onCancelCallback }) => {
  return (
    <PanelFooter>
      <Button variant="subdued" onClick={onCancelCallback}>
        Cancel
      </Button>
      <Button variant="primary">Do it</Button>
    </PanelFooter>
  )
}

const NewItemForm = () => {
  const urlStateKey = useStore((state) => state.urlStateKey)
  const urlState = currentState(urlStateKey)
  const [opened, setOpened] = useState(false)

  // wait until the global state is set to fetch the url state
  useEffect(() => {
    setOpened(urlState?.newItemFormOpened)
  }, [urlStateKey])

  // call close reducer from url store
  const onClose = () => {
    push(urlStateKey, { ...urlState, newItemFormOpened: false })
  }

  // this listener reacts on any change on the url state
  addOnChangeListener(urlStateKey, (newState) => {
    setOpened(newState?.newItemFormOpened)
  })

  return (
    <Panel heading="Panel Title" opened={opened} onClose={onClose}>
      <PanelBody footer={<NewItemFormFooter onCancelCallback={onClose} />}>
        <div>Panel Content here</div>
      </PanelBody>
    </Panel>
  )
}

export default NewItemForm
