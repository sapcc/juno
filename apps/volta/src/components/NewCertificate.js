import React, { useRef, useState, useMemo } from "react"
import { Button, Panel, PanelBody, PanelFooter } from "juno-ui-components"
import { useGlobalState, useDispatch } from "./StateProvider"
import { FormStateProvider } from "./FormState"
import NewCertificateForm from "./NewCertificateForm"
import NewCertificateResutls from "./NewCertificateResults"
import { MessagesStateProvider } from "./MessagesProvider"
import Messages from "./Messages"

const NewCertificate = ({ ca }) => {
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

  const resultsPanelFooter = useMemo(
    () => (
      <PanelFooter>
        <Button
          disabled={!formResutlsCopied}
          onClick={onPanelClose}
          variant="subdued"
        >
          Close
        </Button>
      </PanelFooter>
    ),
    [formResutlsCopied]
  )

  const formPanelFooter = useMemo(
    () => (
      <PanelFooter>
        <Button onClick={onPanelClose} variant="subdued">
          Cancel
        </Button>
        <Button
          className="ml-2"
          onClick={onSaveClicked}
          variant="primary"
          disabled={isFormLoading}
          progress={isFormLoading}
        >
          Create
        </Button>
      </PanelFooter>
    ),
    [isFormLoading]
  )

  return (
    <Panel
      heading="New SSO Certificate"
      opened={showPanel}
      onClose={onPanelClose}
    >
      {showPanel && (
        <MessagesStateProvider>
          {ssoCert ? (
            <PanelBody footer={resultsPanelFooter}>
              <Messages />
              <NewCertificateResutls
                pk={pk}
                ssoCert={ssoCert}
                onCopied={onFormResutlsCopied}
              />
            </PanelBody>
          ) : (
            <PanelBody footer={formPanelFooter}>
              <Messages />
              <FormStateProvider>
                <NewCertificateForm
                  ref={formRef}
                  ca={ca}
                  onFormSuccess={onFormSuccess}
                  onFormLoading={onFormLoading}
                />
              </FormStateProvider>
            </PanelBody>
          )}
        </MessagesStateProvider>
      )}
    </Panel>
  )
}

export default NewCertificate
