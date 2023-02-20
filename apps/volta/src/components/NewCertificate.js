import React, { useRef, useState, useMemo, useCallback } from "react"
import { Button, Panel, PanelFooter } from "juno-ui-components"
import { FormStateProvider } from "./FormState"
import NewCertificateForm from "./NewCertificateForm"
import NewCertificateResutls from "./NewCertificateResults"
import CustomPanelBody from "./CustomPanelBody"
import useStore from "../store"
import { useMessageStore } from "messages-provider"

const NewCertificate = ({ ca }) => {
  const showPanel = useStore(useCallback((state) => state.showNewSSO))
  const setShowNewSSO = useStore(useCallback((state) => state.setShowNewSSO))
  const resetMessages = useMessageStore((state) => state.resetMessages)
  const [pk, setPk] = useState(null)
  const [ssoCert, setSsoCert] = useState(null)
  const [formResutlsCopied, setFormResutlsCopied] = useState(false)
  const [isFormLoading, setIsFormLoading] = useState(false)

  const onPanelClose = () => {
    setShowNewSSO(false)
    // reset messages
    resetMessages()
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
      heading={
        <span>
          New <i>{ca}</i> SSO Certificate
        </span>
      }
      opened={showPanel}
      onClose={onPanelClose}
      closeable={false}
    >
      {showPanel && (
        <>
          {ssoCert ? (
            <CustomPanelBody footer={resultsPanelFooter}>
              <NewCertificateResutls
                pk={pk}
                ssoCert={ssoCert}
                onCopied={onFormResutlsCopied}
              />
            </CustomPanelBody>
          ) : (
            <CustomPanelBody footer={formPanelFooter}>
              <FormStateProvider>
                <NewCertificateForm
                  ref={formRef}
                  ca={ca}
                  onFormSuccess={onFormSuccess}
                  onFormLoading={onFormLoading}
                />
              </FormStateProvider>
            </CustomPanelBody>
          )}
        </>
      )}
    </Panel>
  )
}

export default NewCertificate
