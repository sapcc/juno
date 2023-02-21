import React from "react"
import { Button } from "juno-ui-components"

const AddNewSSOButton = ({ className, label, disabled, onClick }) => {
  return (
    <Button
      icon="addCircle"
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {label || "Add SSO cert"}
    </Button>
  )
}

export default AddNewSSOButton
