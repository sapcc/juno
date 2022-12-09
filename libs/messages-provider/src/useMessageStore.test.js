import * as React from "react"
import { renderHook, act, waitFor } from "@testing-library/react"
import { useStore, MessagesProvider } from "./useMessageStore"

// https://react-hooks-testing-library.com/usage/advanced-hooks
// https://github.com/testing-library/react-hooks-testing-library/issues/654
// https://github.com/testing-library/react-testing-library/pull/991 ==> jtbandes commented on Aug 6
describe("useMessageStore", () => {
  it("return no messages on initialize", () => {
    const wrapper = ({ children }) => (
      <MessagesProvider>{children}</MessagesProvider>
    )
    const { result } = renderHook(() => useStore(), { wrapper })
    expect(result.current.messages.length).toBe(0)
  })

  it("adds a message correctly", () => {
    const wrapper = ({ children }) => (
      <MessagesProvider>{children}</MessagesProvider>
    )
    const { result } = renderHook(() => useStore(), { wrapper })

    act(() => result.current.setMessage("error", "this is an error"))

    waitFor(() => {
      expect(result.current.messages.length).toBe(1)
      expect(result.current.messages[0].variant).toEqual("error")
      expect(result.current.messages[0].text).toEqual("this is an error")
    })
  })

  it("allows knowing variants", () => {
    const wrapper = ({ children }) => (
      <MessagesProvider>{children}</MessagesProvider>
    )
    const { result } = renderHook(() => useStore(), { wrapper })

    expect(() => {
      act(() => result.current.setMessage("miau", "this is an error"))
    }).toThrow(/variant not known/)
  })
})
