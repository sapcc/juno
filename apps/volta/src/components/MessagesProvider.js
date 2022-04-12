import React, { createContext, useReducer } from "react"
import uniqueId from "lodash.uniqueid"

const MessagesState = createContext(null)
const MessagesDispatch = createContext(null)

const initialState = { items: [] }

export const newMessage = (msg) => {
  const message = { id: uniqueId("message-"), text: "", variant: "info" }
  if (
    msg?.text &&
    (typeof msg.text === "object" || typeof msg.text === "string")
  ) {
    message.text = msg.text
  } else {
    console.warn("Message text should be a string or html element")
  }
  if (msg?.variant && typeof msg.variant === "string") {
    message.variant = msg.variant
  } else {
    console.warn("Message variant should be a string")
  }
  return message
}

const setMessage = (state, { msg }) => {
  const message = newMessage(msg)
  // check if a message with the same text and variant exists
  const index = state.items.findIndex((item) => {
    return (
      JSON.stringify(item.text) === JSON.stringify(message.text) &&
      item.variant === message.variant
    )
  })

  if (index >= 0) {
    return state
  }
  let items = state.items.slice()
  items.push(message)
  return { ...state, items: items }
}
const removeMessage = (state, { id }) => {
  const index = state.items.findIndex((item) => item.id == id)
  if (index < 0) {
    return state
  }
  let newItems = state.items.slice()
  newItems.splice(index, 1)
  return { ...state, items: newItems }
}

const resetMessages = (state) => {
  return { ...state, items: [] }
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_MESSAGE":
      return setMessage(state, action)
    case "REMOVE_MESSAGE":
      return removeMessage(state, action)
    case "RESET_MESSAGE":
      return resetMessages(state, action)
    default:
      return StaticRange
  }
}

export const MessagesStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <MessagesState.Provider value={state}>
      <MessagesDispatch.Provider value={dispatch}>
        {children}
      </MessagesDispatch.Provider>
    </MessagesState.Provider>
  )
}

export const useMessagesDispatch = () => React.useContext(MessagesDispatch)

export const useMessagesState = () => {
  return React.useContext(MessagesState)
}
