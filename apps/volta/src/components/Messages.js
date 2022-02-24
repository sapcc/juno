import React from "react"
import { Message, Icon, Stack } from "juno-ui-components"
import { useMessagesState } from "./MessagesProvider"

const Messages = () => {
  const messagesState = useMessagesState()
  return (
    <>
      {messagesState?.items && (
        <>
          {messagesState?.items.map((item) => (
            <Message key={item.id} variant={item.variant}>
              {item.text}
              {/* <Stack alignment="center" className="w-full">
                {item.text}
                <Stack
                  alignment="center"
                  className="ml-auto"
                  distribution="end"
                >
                  <Icon icon="close" />
                </Stack>
              </Stack> */}
            </Message>
          ))}
        </>
      )}
    </>
  )
}

export default Messages
