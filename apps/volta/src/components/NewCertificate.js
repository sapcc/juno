import React from "react"
import { Button, Panel, PanelBody, PanelFooter } from "juno-ui-components"
import { useGlobalState, useDispatch } from "./StateProvider"
import { FormStateProvider } from "./FormState"
import Form from "./Form"

const NewCertificate = () => {
  const showPanel = useGlobalState().globals.showNewSSO
  const dispatch = useDispatch()

  const onPanelClose = () => {
    dispatch({ type: "SHOW_NEW_SSO", show: false })
  }

  return (
    <Panel
      heading="New SSO Certificates"
      opened={showPanel}
      onClose={onPanelClose}
    >
      <PanelBody>
        {showPanel && (
          <FormStateProvider>
            <Form />
          </FormStateProvider>
        )}
      </PanelBody>
      <PanelFooter>
        <Button>Do it</Button>
      </PanelFooter>
    </Panel>
  )
}

export default NewCertificate
