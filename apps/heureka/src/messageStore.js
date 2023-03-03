import React, { createContext, useContext, useRef } from "react"
import { createStore, useStore as useZustandStore } from "zustand"
import uniqueId from "lodash.uniqueid"

// good example
// https://codesandbox.io/s/ivanyur4enk0-zustand-createcontext-issue-forked-x7m2f?file=/src/TestContext.js:377-389

const StoreContext = createContext()

const initialStore = () =>
  createStore((set) => ({
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
        return { ...state, items: items }
      }),
    removeMessage: (id) =>
      set((state) => {
        // find the message with id
        const index = state.items.findIndex((item) => item.id == id)
        if (index < 0) {
          return state
        }
        let newItems = state.items.slice()
        newItems.splice(index, 1)
        return { ...state, items: newItems }
      }),
  }))

export const MessagesStateProvider = ({ children }) => {
  const store = useRef(initialStore()).current
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

const useStore = (selector) => {
  const store = useContext(StoreContext)
  return useZustandStore(store, selector)
}
export { useStore }
