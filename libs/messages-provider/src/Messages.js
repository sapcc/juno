import React from "react"
import { Message } from "juno-ui-components"
import { useMessages, useActions } from "./useMessageStore"

const shouldAutoDismiss = (variant) => {
  if (variant === "info" || variant === "success") return true
  return false
}

const Messages = ({ className }) => {
  const messages = useMessages()
  const { removeMessage } = useActions()

  const onDismiss = (id) => {
    removeMessage(id)
  }

  return (
    <>
      {messages && messages.length > 0 && (
        <div className={`juno-message-provider ${className}`}>
          {messages.map((item, index) => (
            <Message
              key={item.id}
              className={index > 0 ? "mt-4" : ""}
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
