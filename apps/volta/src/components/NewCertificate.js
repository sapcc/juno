import React, { useRef, useState } from "react"
import { Button, Panel, PanelBody, PanelFooter } from "juno-ui-components"
import { useGlobalState, useDispatch } from "./StateProvider"
import { FormStateProvider } from "./FormState"
import Form from "./Form"
import SSO from "./SSO"

const NewCertificate = () => {
  const showPanel = useGlobalState().globals.showNewSSO
  const dispatch = useDispatch()
  const [pk, setPk] = useState(null)
  const [ssoCert, setSsoCert] = useState(null)
  const [formResutlsCopied, setFormResutlsCopied] = useState(false)

  const onPanelClose = () => {
    dispatch({ type: "SHOW_NEW_SSO", show: false })
    // reset from results
    setPk(null)
    setSsoCert(null)
    setFormResutlsCopied(false)
  }

  const formRef = useRef()
  const onSaveClicked = () => {
    formRef.current.submit()
  }

  const onFormSubmitted = (newPk, newssoCert) => {
    setPk(newPk)
    setSsoCert(newssoCert)
  }

  const onFormResutlsCopied = (isCopied) => {
    setFormResutlsCopied(isCopied)
  }

  return (
    <Panel
      heading="New SSO Certificates"
      opened={showPanel}
      onClose={onPanelClose}
    >
      <PanelBody>
        {showPanel && (
          <>
            {ssoCert ? (
              <SSO pk={pk} ssoCert={ssoCert} onCopied={onFormResutlsCopied} />
            ) : (
              <FormStateProvider>
                <Form ref={formRef} onFormSubmitted={onFormSubmitted} />
              </FormStateProvider>
            )}
          </>
        )}
      </PanelBody>
      <PanelFooter>
        {ssoCert ? (
          <Button
            disabled={!formResutlsCopied}
            onClick={onPanelClose}
            variant="subdued"
          >
            Close
          </Button>
        ) : (
          <>
            <Button onClick={onPanelClose} variant="subdued">
              Cancel
            </Button>
            <Button onClick={onSaveClicked} variant="primary">
              Create
            </Button>
          </>
        )}
      </PanelFooter>
    </Panel>
  )
}

export default NewCertificate
