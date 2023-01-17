import React, { useCallback } from "react"
import { Message } from "juno-ui-components"
import { useStore } from "./useMessageStore"

const shouldAutoDismiss = (variant) => {
  if (variant === "info" || variant === "success") return true
  return false
}

const Messages = ({ className }) => {
  const messages = useStore(useCallback((state) => state.messages))
  const removeMessage = useStore((state) => state.removeMessage)

  const onDismiss = (id) => {
    removeMessage(id)
  }

  return (
    <>
      {messages && messages.length > 0 && (
        <div className={`juno-message-provider ${className}`}>
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
