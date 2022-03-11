import React from "react"
import { Stack, Button } from "juno-ui-components"

const NewCertificateForm = ({ name, logout }) => {
  return (
    <PanelBody>
      <FormStateProvider>
        <CertificateForm
          ref={formRef}
          onFormSuccess={onFormSuccess}
          onFormLoading={onFormLoading}
        />
      </FormStateProvider>
    </PanelBody>
  )
}

export default NewCertificateForm
