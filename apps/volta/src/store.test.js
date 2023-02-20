import { renderHook, act, waitFor } from "@testing-library/react"
import useStore from "./store"

describe("setDisabledCAs", () => {
  it("return default empty array", () => {
    const { result } = renderHook(() => useStore((state) => state))
    expect(result.current.disabledCAs).toEqual([])
  })

  it("accepts and transforms to array of strings coma separated strings containing the CA names which should not be displayed", () => {
    const { result } = renderHook(() => useStore((state) => state))

    act(() => {
      result.current.setDisabledCAs("galvani-pki,mutual_tls-pki")
    })

    expect(result.current.disabledCAs).toEqual([
      "galvani-pki",
      "mutual_tls-pki",
    ])
  })
})

describe("setDocumentationLinks", () => {
  it("return default empty object", () => {
    const { result } = renderHook(() => useStore((state) => state))
    expect(result.current.documentationLinks).toEqual({})
  })

  it("accepts and transforms to an object strings with key value pairs separated by '=' and each pair separated by ','", () => {
    const { result } = renderHook(() => useStore((state) => state))

    act(() => {
      result.current.setDocumentationLinks(
        "2fa-pki=https://doculink1.com,mutual_tls-pki=https://doculink2.com"
      )
    })

    expect(result.current.documentationLinks).toEqual({
      "2fa-pki": "https://doculink1.com",
      "mutual_tls-pki": "https://doculink2.com",
    })
  })
})
