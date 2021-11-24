/**
 * @jest-environment jsdom
 */

import { renderHook } from "@testing-library/react-hooks"
import useURLStateProvider from "./useURLStateProvider"

describe("useURLStateProvider", () => {
  it("initializes url based navigation", () => {
    const { result } = renderHook(() => useURLStateProvider("app1"))

    expect(result.current.state).toBeDefined()
    expect(result.current.navigateTo).toBeDefined()
    expect(result.current.redirectTo).toBeDefined()
  })

  it("throws an error if stateID is missing", () => {
    expect(() => {
      const { result } = renderHook(() => useURLStateProvider())

      expect(result.current.error).toEqual(
        "stateID is undefined. Please provide an unique ID."
      )
    }).toThrow()
  })
})
