import React from "react"
import { useGlobalState, useDispatch } from "./StateProvider"
import { Button } from "juno-ui-components"

const AddNewSSOButton = ({ className }) => {
  const isNewSSOEnabled = useGlobalState().globals.isNewSSOEnabled
  const isPanelShown = useGlobalState().globals.showNewSSO
  const dispatch = useDispatch()

  const onAddClicked = () => {
    dispatch({ type: "SHOW_NEW_SSO", show: true })
  }

  return (
    <Button
      icon="addCircle"
      disabled={!isNewSSOEnabled || isPanelShown}
      onClick={onAddClicked}
      className={className}
    >
      Add SSO cert
    </Button>
  )
}

export default AddNewSSOButton
