/**
 * @jest-environment jsdom
 */

import { renderHook } from "@testing-library/react-hooks"
import useOidcAuth from "./useOidcAuth"

describe("useOidcAuth", () => {
  it("returns an error if params are missing", () => {
    const { result } = renderHook(() => useOidcAuth())
    // read error to run this hook
    expect(result.current.error).toEqual(
      "clientID or issuerURL are undefined. Please provide a clientID and issuerURL."
    )
  })

  it("returns an error if clientID is missing", () => {
    const { result } = renderHook(() => useOidcAuth({ issuerURL: "TEST" }))
    // read error to run this hook
    expect(result.current.error).toEqual(
      "clientID or issuerURL are undefined. Please provide a clientID and issuerURL."
    )
  })

  it("returns an error if issuerURL is missing", () => {
    const { result } = renderHook(() => useOidcAuth({ clientID: "TEST" }))
    // read error to run this hook
    expect(result.current.error).toEqual(
      "clientID or issuerURL are undefined. Please provide a clientID and issuerURL."
    )
  })

  it("returns an error if issuerURL is missing", () => {
    const { result } = renderHook(() =>
      useOidcAuth({ clientID: "TEST", issuerURL: "TEST" })
    )
    // read error to run this hook
    expect(result.current.error).toBeNull
  })
})
