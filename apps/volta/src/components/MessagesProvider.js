import React, { createContext, useReducer } from "react"
import uniqueId from "lodash.uniqueid"

const MessagesState = createContext(null)
const MessagesDispatch = createContext(null)

const initialState = { items: [] }

const setMessage = (state, { msg }) => {
  let items = state.items.slice()
  msg.id = uniqueId("message-")
  items.push(msg)
  // sort
  // items = items.sort((a, b) => a.variant.localeCompare(b.variant))
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

function reducer(state, action) {
  switch (action.type) {
    case "SET_MESSAGE":
      return setMessage(state, action)
    case "REMOVE_REMOVE":
      return removeMessage(state, action)
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
