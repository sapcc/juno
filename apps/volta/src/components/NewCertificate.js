import React, { useRef, useState, useMemo, useCallback } from "react"
import { Button, Panel, PanelFooter } from "juno-ui-components"
import { CertStateProvider } from "../hooks/useCertState"
import NewCertificateForm from "./NewCertificateForm"
import NewCertificateResutls from "./NewCertificateResults"
import CustomPanelBody from "./CustomPanelBody"
import { useSsoShowNew, useSsoActions } from "../hooks/useStore"
import { useMessageStore } from "messages-provider"
import FormPanelFooter from "./NewCertificateFormPanelFooter"

const NewCertificate = ({ ca }) => {
  const showPanel = useSsoShowNew()
  const { setShowNewCert } = useSsoActions()
  const resetMessages = useMessageStore((state) => state.resetMessages)
  const [pk, setPk] = useState(null)
  const [ssoCert, setSsoCert] = useState(null)
  const [formResutlsCopied, setFormResutlsCopied] = useState(false)

  const onPanelClose = () => {
    setShowNewCert(false)
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
            <CertStateProvider>
              <CustomPanelBody
                footer={
                  <FormPanelFooter
                    onCancel={onPanelClose}
                    onSave={onSaveClicked}
                  />
                }
              >
                <NewCertificateForm
                  ref={formRef}
                  ca={ca}
                  onFormSuccess={onFormSuccess}
                />
              </CustomPanelBody>
            </CertStateProvider>
          )}
        </>
      )}
    </Panel>
  )
}

export default NewCertificate
