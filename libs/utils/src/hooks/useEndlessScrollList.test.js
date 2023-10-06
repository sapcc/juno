import { renderHook, act, waitFor } from "@testing-library/react"
import { useEndlessScrollList } from "../index"

describe("useEndlessScrollList", () => {
  it("return no scroll items if items not all provided", () => {
    const { result } = renderHook(() => useEndlessScrollList([]))
    expect(result.current.scrollListItems.length).toBe(0)
  })
})
