import React from "react"
import create from "zustand"
import createContext from "zustand/context"
import { devtools } from "zustand/middleware"
import uniqueId from "lodash.uniqueid"

// good example
// https://codesandbox.io/s/ivanyur4enk0-zustand-createcontext-issue-forked-x7m2f?file=/src/TestContext.js:377-389

const { Provider, useStore } = createContext()

const initialStore = () =>
  create(
    devtools((set) => ({
      items: [], // this is the state
      setMessage: (msg) =>
        set((state) => {
          // check if a message with the same text and variant exists
          const index = state.items.findIndex((item) => {
            return (
              JSON.stringify(item.text) === JSON.stringify(msg.text) &&
              item.variant === msg.variant
            )
          })
          if (index >= 0) return state

          let items = state.items.slice()
          msg.id = uniqueId("message-")
          items.push(msg)
          return { items: items }
        }),
    }))
  )

export const MessagesStateProvider = ({ children }) => {
  return <Provider createStore={initialStore}>{children}</Provider>
}

export { useStore }
