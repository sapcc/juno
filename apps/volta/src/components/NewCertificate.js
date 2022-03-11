import React, { useRef, useState } from "react"
import { Button, Panel, PanelBody, PanelFooter } from "juno-ui-components"
import { useGlobalState, useDispatch } from "./StateProvider"
import { FormStateProvider } from "./FormState"
import CertificateForm from "./CertificateForm"
import SSO from "./SSO"
import { MessagesStateProvider } from "./MessagesProvider"
import Messages from "./Messages"

const NewCertificate = () => {
  const showPanel = useGlobalState().globals.showNewSSO
  const dispatch = useDispatch()

  const [pk, setPk] = useState(null)
  const [ssoCert, setSsoCert] = useState(null)
  const [formResutlsCopied, setFormResutlsCopied] = useState(false)
  const [isFormLoading, setIsFormLoading] = useState(false)

  const onPanelClose = () => {
    dispatch({ type: "SHOW_NEW_SSO", show: false })
    // reset form results
    setPk(null)
    setSsoCert(null)
    setFormResutlsCopied(false)
  }

  const formRef = useRef()
  const onSaveClicked = () => {
    formRef.current.submit()
  }

  const onFormSuccess = (newPk, newssoCert) => {
    setPk(newPk)
    setSsoCert(newssoCert)
  }

  const onFormResutlsCopied = (isCopied) => {
    setFormResutlsCopied(isCopied)
  }

  const onFormLoading = (isLoading) => {
    setIsFormLoading(isLoading)
  }

  return (
    <Panel
      heading="New SSO Certificates"
      opened={showPanel}
      onClose={onPanelClose}
    >
      <PanelBody>
        <MessagesStateProvider>
          <Messages />
          {showPanel && (
            <>
              {ssoCert ? (
                <SSO pk={pk} ssoCert={ssoCert} onCopied={onFormResutlsCopied} />
              ) : (
                <FormStateProvider>
                  <CertificateForm
                    ref={formRef}
                    onFormSuccess={onFormSuccess}
                    onFormLoading={onFormLoading}
                  />
                </FormStateProvider>
              )}
            </>
          )}
        </MessagesStateProvider>
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
            <Button
              disabled={isFormLoading}
              onClick={onPanelClose}
              variant="subdued"
            >
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
