import React, { useRef, useState } from "react"
import { Button, Panel, PanelBody, PanelFooter } from "juno-ui-components"
import { useGlobalState, useDispatch } from "./StateProvider"
import { FormStateProvider } from "./FormState"
import Form from "./Form"

const NewCertificate = () => {
  const showPanel = useGlobalState().globals.showNewSSO
  const dispatch = useDispatch()
  const [isFormValid, setIsFormValid] = useState(false)

  const onPanelClose = () => {
    dispatch({ type: "SHOW_NEW_SSO", show: false })
  }

  const formRef = useRef()
  const onSaveClicked = () => {
    formRef.current.submit()
  }

  const onValidationChanged = (formValidation) => {
    const isValid = Object.keys(formValidation).length === 0
    setIsFormValid(isValid)
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
            <Form ref={formRef} onValidationChanged={onValidationChanged} />
          </FormStateProvider>
        )}
      </PanelBody>
      <PanelFooter>
        <Button disabled={!isFormValid} onClick={onSaveClicked}>
          Save
        </Button>
      </PanelFooter>
    </Panel>
  )
}

export default NewCertificate
