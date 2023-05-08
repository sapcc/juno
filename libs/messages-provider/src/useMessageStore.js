import React, { createContext, useContext } from "react"
import { createStore, useStore } from "zustand"
import PropTypes from "prop-types"

const addMessageValidation = (props) => {
  PropTypes.checkPropTypes(
    {
      text: PropTypes.string.isRequired,
      variant: PropTypes.oneOf([
        "info",
        "warning",
        "danger",
        "error",
        "success",
      ]),
    },
    props,
    "prop",
    "MessageProvider.addMessage"
  )
  return props
}

const removeMessageValidation = (props) => {
  PropTypes.checkPropTypes(
    {
      id: PropTypes.string.isRequired,
    },
    props,
    "prop",
    "MessageProvider.removeMessage"
  )
  return props
}

const uniqueId = (prefix) => {
  return `${prefix}-${(+new Date() + Math.random()).toString(36).slice(-5)}}`
}

// General zustand docu: https://github.com/pmndrs/zustand
// v3
// Zustand context example: https://codesandbox.io/s/ivanyur4enk0-zustand-createcontext-issue-forked-x7m2f?file=/src/TestContext.js:377-389
// Zustand with typescript: https://docs.pmnd.rs/zustand/guides/typescript#slices-pattern
// v4
// https://github.com/pmndrs/zustand/blob/55d0c3aec9fbca9d56432f39abba08f7b90e7edb/docs/previous-versions/zustand-v3-create-context.md
const createMessagesSlice = (set, get) => ({
  storeId: uniqueId("store-"),
  messages: [], // this is the messages state
  actions: {
    addMessage: ({ variant, text }) => {
      get().addMessage({ variant, text })
    },
    removeMessage: (id) => {
      get().removeMessage(id)
    },
    resetMessages: () => {
      get().resetMessages()
    },
  },
  addMessage: ({ variant, text }) => {
    addMessageValidation({ variant: variant, text: text })
    return set((state) => {
      console.log("STORE: ", state.storeId)
      // check if a message with the same text and variant exists
      const index = state.messages.findIndex((item) => {
        return (
          JSON.stringify(item.text) === JSON.stringify(text) &&
          item.variant === variant
        )
      })
      if (index >= 0) return state

      let items = state.messages.slice()
      items.push({
        variant: variant,
        text: text,
        id: uniqueId("message-"),
      })
      return { ...state, messages: items }
    })
  },
  removeMessage: (id) => {
    removeMessageValidation({ id: id })
    return set((state) => {
      // find the message with id
      const index = state.messages.findIndex((item) => item.id == id)
      if (index < 0) {
        return state
      }
      let newItems = state.messages.slice()
      newItems.splice(index, 1)
      return { ...state, messages: newItems }
    })
  },
  resetMessages: () =>
    set((state) => {
      return { ...state, messages: [] }
    }),
})

const StoreContext = createContext()

export const MessagesProvider = ({ children }) => {
  return (
    <StoreContext.Provider
      value={createStore((set, get) => createMessagesSlice(set, get))}
    >
      {children}
    </StoreContext.Provider>
  )
}

const messageStore = (selector) => useStore(useContext(StoreContext), selector)

// decrecated old hook
export const useMessageStore = (selector) => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    console.warn(
      `useMessageStore is deprecated and will be removed with the next version 0.2.0. Please visit the documentation (https://assets.juno.global.cloud.sap/?__s=N4IghgzhCmAuEFoD2A3aAnFBLaB3EAXKLGAEYCSAdgCbQAehATADQiVgrmzQC2hIIVgAcwlaABsA8kOhjqhWOgCu0VpBiwAcmB7R+uqGADm0REPSostdIPBQ4ANQwQsSSvwAMAOgCMXgKwgAL5BQA) for more information.`
    )
  }
  return messageStore(selector)
}

// states
export const useMessages = () => messageStore((state) => state.messages)

// actions
export const useActions = () => messageStore((state) => state.actions)
