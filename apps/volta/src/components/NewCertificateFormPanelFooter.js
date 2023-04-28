import React from "react"
import { Button, Panel, PanelFooter } from "juno-ui-components"

const NewCertificateFormPanelFooter = ({ onCancel, onSave }) => {
  return (
    <PanelFooter>
      <Button onClick={onCancel} variant="subdued">
        Cancel
      </Button>
      <Button className="ml-2" onClick={onSave} variant="primary">
        Create
      </Button>
    </PanelFooter>
  )
}

export default NewCertificateFormPanelFooter
