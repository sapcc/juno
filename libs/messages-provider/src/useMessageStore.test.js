import * as React from "react"
import { renderHook, act, waitFor } from "@testing-library/react"
import { useStore, MessagesProvider } from "./useMessageStore"

const originalConsoleError = global.console.error

beforeEach(() => {
  global.console.error = (...args) => {
    const propTypeFailures = [/Failed prop type/, /Warning: Received/]

    if (propTypeFailures.some((p) => p.test(args[0]))) {
      throw new Error(args[0])
    }

    originalConsoleError(...args)
  }
})

// https://github.com/testing-library/react-hooks-testing-library/blob/chore/migration-guide/MIGRATION_GUIDE.md
// https://react-hooks-testing-library.com/usage/advanced-hooks
// React 17 @testing-library/react-hooks issue with React 18
//   https://github.com/testing-library/react-hooks-testing-library/issues/654
// React 17 @testing-library/react-hooks vs React 18 @testing-library/react
//   https://github.com/testing-library/react-testing-library/pull/991#issuecomment-1207138334
// catch consol warns: https://www.jackfranklin.co.uk/blog/failing-tests-on-react-proptypes/
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

    act(() =>
      result.current.addMessage({ variant: "error", text: "this is an error" })
    )

    waitFor(() => {
      expect(result.current.messages.length).toBe(1)
      expect(result.current.messages[0].variant).toEqual("error")
      expect(result.current.messages[0].text).toEqual("this is an error")
    })
  })

  it("test proptype for addMessage text", () => {
    const wrapper = ({ children }) => (
      <MessagesProvider>{children}</MessagesProvider>
    )
    const { result } = renderHook(() => useStore(), { wrapper })

    expect(() => {
      act(() => result.current.addMessage({ variant: "error" }))
    }).toThrow(/Failed prop type: The prop `text`/)
  })

  it("test proptype for addMessage variant", () => {
    const wrapper = ({ children }) => (
      <MessagesProvider>{children}</MessagesProvider>
    )
    const { result } = renderHook(() => useStore(), { wrapper })

    expect(() => {
      act(() =>
        result.current.addMessage({ variant: "miau", text: "this is an error" })
      )
    }).toThrow(/Failed prop type: Invalid prop `variant`/)
  })

  it("remove a message correctly", () => {
    const wrapper = ({ children }) => (
      <MessagesProvider>{children}</MessagesProvider>
    )
    const { result } = renderHook(() => useStore(), { wrapper })

    act(() =>
      result.current.addMessage({ variant: "error", text: "this is an error" })
    )
    act(() =>
      result.current.addMessage({
        variant: "info",
        text: "this is an info message",
      })
    )

    waitFor(() => {
      expect(result.current.messages.length).toBe(2)
    })
    act(() => result.current.removeMessage(result.current.messages[1].id))
    waitFor(() => {
      expect(result.current.messages.length).toBe(1)
    })
  })

  it("test proptype for removeMessage id", () => {
    const wrapper = ({ children }) => (
      <MessagesProvider>{children}</MessagesProvider>
    )
    const { result } = renderHook(() => useStore(), { wrapper })

    expect(() => {
      act(() => result.current.removeMessage())
    }).toThrow(/Failed prop type: The prop `id`/)
  })

  it("reset messages store", () => {
    const wrapper = ({ children }) => (
      <MessagesProvider>{children}</MessagesProvider>
    )
    const { result } = renderHook(() => useStore(), { wrapper })

    act(() =>
      result.current.addMessage({ variant: "error", text: "this is an error" })
    )
    act(() =>
      result.current.addMessage({
        variant: "info",
        text: "this is an info message",
      })
    )

    waitFor(() => {
      expect(result.current.messages.length).toBe(2)
    })
    act(() => result.current.resetMessages())
    waitFor(() => {
      expect(result.current.messages.length).toBe(0)
    })
  })
})
