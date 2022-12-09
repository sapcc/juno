import React from "react"
import create from "zustand"
import createContext from "zustand/context"
import { devtools } from "zustand/middleware"
import uniqueId from "lodash.uniqueid"

const VARIANTS = ["info", "success", "warning", "danger", "error"]
const validateMessage = (variant) => {
  if (!VARIANTS.includes(variant)) {
    throw new Error(
      `variant not known. Please choose one of these: ${JSON.stringify(
        VARIANTS
      )}`
    )
  }
}

// See how this works here: https://github.com/pmndrs/zustand
// good example: https://codesandbox.io/s/ivanyur4enk0-zustand-createcontext-issue-forked-x7m2f?file=/src/TestContext.js:377-389
// https://github.com/testing-library/react-hooks-testing-library/blob/chore/migration-guide/MIGRATION_GUIDE.md
const { Provider, useStore } = createContext()

const initialStore = () =>
  create(
    devtools((set) => ({
      messages: [], // this is the messages state
      setMessage: (variant, text) =>
        set((state) => {
          // validate message
          validateMessage(variant)
          // check if a message with the same text and variant exists
          const index = state.messages.findIndex((item) => {
            return (
              JSON.stringify(item.text) === JSON.stringify(text) &&
              item.variant === variant
            )
          })
          if (index >= 0) return state

          let items = state.messages.slice()
          items.push({ variant: variant, text: text, id: uniqueId("message-") })
          return { ...state, messages: items }
        }),
      removeMessage: (id) =>
        set((state) => {
          // find the message with id
          const index = state.messages.findIndex((item) => item.id == id)
          if (index < 0) {
            return state
          }
          let newItems = state.messages.slice()
          newItems.splice(index, 1)
          return { ...state, messages: newItems }
        }),
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
