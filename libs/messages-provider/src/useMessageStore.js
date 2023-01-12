import React from "react"
import create from "zustand"
import createContext from "zustand/context"
import { devtools } from "zustand/middleware"
import uniqueId from "lodash.uniqueid"
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

const addMessageSlice = (set) => ({})

// General zustand docu: https://github.com/pmndrs/zustand
// Zustand context example: https://codesandbox.io/s/ivanyur4enk0-zustand-createcontext-issue-forked-x7m2f?file=/src/TestContext.js:377-389
// Zustand with typescript: https://docs.pmnd.rs/zustand/guides/typescript#slices-pattern
const { Provider, useStore } = createContext()

const initialStore = () =>
  create(
    devtools((set) => ({
      messages: [], // this is the messages state
      addMessage: (variant, text) => {
        addMessageValidation({ variant: variant, text: text })
        return set((state) => {
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
    }))
  )

export const MessagesProvider = ({ children }) => {
  return <Provider createStore={initialStore}>{children}</Provider>
}

export { useStore }
