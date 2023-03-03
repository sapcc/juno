/**
 * @jest-environment jsdom
 */

import { renderHook } from "@testing-library/react-hooks"
import useOidcAuth from "./useOidcAuth"

globalThis.console.error = jest.fn()

describe("useOidcAuth", () => {
  let spy
  beforeEach(() => {
    spy = jest.spyOn(globalThis.console, "error").mockImplementation(() => null)
  })
  it("returns an error if params are missing", async () => {
    const { result } = await renderHook(() => useOidcAuth())
    // read error to run this hook
    expect(spy).toHaveBeenCalledWith(
      "useOidcAuth: issuerURL or clientID are undefined!"
    )

    expect(result.current).toEqual({})
  })

  it("returns an error if clientID is missing", () => {
    const { result } = renderHook(() => useOidcAuth({ issuerURL: "TEST" }))
    // read error to run this hook
    expect(spy).toHaveBeenCalledWith(
      "useOidcAuth: issuerURL or clientID are undefined!"
    )
    expect(result.current).toEqual({})
  })

  it("returns an error if issuerURL is missing", () => {
    const { result } = renderHook(() => useOidcAuth({ clientID: "TEST" }))
    // read error to run this hook
    expect(spy).toHaveBeenCalledWith(
      "useOidcAuth: issuerURL or clientID are undefined!"
    )
    expect(result.current).toEqual({})
  })

  it("returns an error if issuerURL is missing", () => {
    const { result } = renderHook(() =>
      useOidcAuth({ clientID: "TEST", issuerURL: "TEST" })
    )
    expect(Object.keys(result.current).sort()).toEqual([
      "auth",
      "error",
      "isProcessing",
      "loggedIn",
      "login",
      "logout",
    ])
  })
})
