import React, { useCallback } from "react"
import { Message } from "juno-ui-components"
import { useStore } from "./useMessageStore"

// possible variants are
// 'info', 'success', 'warning', 'danger', 'error'

const shouldAutoDismiss = (variant) => {
  if (variant === "info" || variant === "success") return true
  return false
}

const Messages = () => {
  const messages = useStore(useCallback((state) => state.items))
  const removeMessage = useStore((state) => state.removeMessage)

  const onDismiss = (id) => {
    removeMessage(id)
  }

  return (
    <>
      {messages && messages.length > 0 && (
        <div className="mt-4">
          {messages.map((item) => (
            <Message
              key={item.id}
              variant={item.variant}
              dismissible={true}
              autoDismiss={shouldAutoDismiss(item.variant)}
              onDismiss={() => onDismiss(item.id)}
            >
              {item.text}
            </Message>
          ))}
        </div>
      )}
    </>
  )
}

export default Messages
