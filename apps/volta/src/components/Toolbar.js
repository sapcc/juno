import React from "react"
import { useGlobalState, useDispatch } from "./StateProvider"
import { ContentAreaToolbar, Button } from "juno-ui-components"

const Toolbar = () => {
  const isNewSSOEnabled = useGlobalState().globals.isNewSSOEnabled
  const dispatch = useDispatch()

  const onAddClicked = () => {
    dispatch({ type: "SHOW_NEW_SSO", show: true })
  }

  return (
    <ContentAreaToolbar>
      <Button
        icon="addCircle"
        disabled={!isNewSSOEnabled}
        onClick={onAddClicked}
      >
        Add SSO cert
      </Button>
    </ContentAreaToolbar>
  )
}

export default Toolbar
