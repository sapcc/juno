import React from "react"
import { Button, Panel, PanelFooter } from "juno-ui-components"
import { useSsoIsFormSubmitting } from "../hooks/useStore"

const NewCertificateFormPanelFooter = ({ onCancel, onSave }) => {
  const isFormSubmitting = useSsoIsFormSubmitting()
  return (
    <PanelFooter>
      <Button onClick={onCancel} variant="subdued" disabled={isFormSubmitting}>
        Cancel
      </Button>
      <Button
        className="ml-2"
        onClick={onSave}
        variant="primary"
        disabled={isFormSubmitting}
        progress={isFormSubmitting}
      >
        Create
      </Button>
    </PanelFooter>
  )
}

export default NewCertificateFormPanelFooter
