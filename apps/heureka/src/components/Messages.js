import React, { useCallback } from "react"
import { Message } from "juno-ui-components"
import { useStore } from "../messageStore"

const Messages = () => {
  const messages = useStore(useCallback((state) => state.items))
  return (
    <>
      {messages && (
        <>
          {messages.map((item) => (
            <Message key={item.id} variant={item.variant}>
              {item.text}
            </Message>
          ))}
        </>
      )}
    </>
  )
}

export default Messages
