import React, { useState, forwardRef, useImperativeHandle } from "react"
import { Stack, Button, Icon } from "juno-ui-components"

const InlineConfirmRemove = ({ onRemoveConfirmed }, ref) => {
  const [showConfirm, setShowConfirm] = useState(false)

  useImperativeHandle(ref, () => ({
    reset() {
      setShowConfirm(false)
    },
  }))

  const onRemoveClicked = () => {
    setShowConfirm(true)
  }

  const onConfirmClicked = () => {
    if (onRemoveConfirmed) onRemoveConfirmed()
  }

  const onCancelClicked = () => {
    setShowConfirm(false)
  }

  return (
    <Stack direction="vertical">
      {showConfirm ? (
        <div>
          <span>Are you sure?</span>
          <Stack alignment="center">
            <Button
              label="Revoke"
              size="small"
              variant="primary-danger"
              onClick={onConfirmClicked}
            />
            <Button
              className="ml-2"
              label="Cancel"
              size="small"
              onClick={onCancelClicked}
              variant="subdued"
            />
          </Stack>
        </div>
      ) : (
        <Icon icon="deleteForever" onClick={onRemoveClicked} />
      )}
    </Stack>
  )
}

export default forwardRef(InlineConfirmRemove)
