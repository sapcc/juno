import React from "react"
import { Message } from "juno-ui-components"
import { useMessagesState, useMessagesDispatch } from "./MessagesProvider"

// possible variants are
// 'info', 'success', 'warning', 'danger', 'error'

const shouldAutoDismiss = (variant) => {
  if (variant === "info" || variant === "success") return true
  return false
}

const Messages = () => {
  const messagesState = useMessagesState()
  const dispatchMessage = useMessagesDispatch()

  const onDismiss = (id) => {
    dispatchMessage({
      type: "REMOVE_MESSAGE",
      id: id,
    })
  }

  return (
    <div className="messages-container">
      {messagesState?.items && (
        <>
          {messagesState?.items.map((item) => (
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
        </>
      )}
    </div>
  )
}

export default Messages
