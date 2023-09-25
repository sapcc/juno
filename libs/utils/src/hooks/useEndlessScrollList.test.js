import { renderHook, act, waitFor } from "@testing-library/react"
import { useEndlessScrollList } from "../index"

describe("useEndlessScrollList", () => {
  it("return no messages on initialize", () => {
    const { result } = renderHook(() => useEndlessScrollList([]))
    expect(result.current.scrollListItems.length).toBe(0)
  })
})
