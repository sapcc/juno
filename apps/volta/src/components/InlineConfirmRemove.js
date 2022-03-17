import React from "react"
import { Stack, Button, Icon } from "juno-ui-components"

const inlineConfirmRemove = (isOpen) => {
  return `
      absolute
      w-full
      top-full
      z-50
      mt-0.5
      opacity-0
      transition-opacity
      ease-out
      duration-300
			${isOpen && `opacity-100`}
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const inlineConfirmContainer = `
rounded
bg-theme-background-lvl-0
backdrop-blur
bg-opacity-70
px-2
py-2.5
text-theme-default 
text-opacity-70
`

const InlineConfirmRemove = ({
  show,
  text,
  actionText,
  actionIcon,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={`juno-inline-remove ${inlineConfirmRemove(show)}`}>
      {show && (
        <div className={inlineConfirmContainer}>
          <Stack alignment="center">
            <span className="w-full">{text || "Are you sure?"}</span>
            <Button
              icon={actionIcon || "deleteForever"}
              label={actionText || "Confirm"}
              size="small"
              variant="primary-danger"
              onClick={onConfirm}
            />
            <Button
              icon="cancel"
              className="ml-2"
              label="Cancel"
              size="small"
              onClick={onCancel}
              variant="subdued"
            />
          </Stack>
        </div>
      )}
    </div>
  )
}

export default InlineConfirmRemove
