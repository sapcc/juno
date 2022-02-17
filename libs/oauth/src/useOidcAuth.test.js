/**
 * @jest-environment jsdom
 */

import { renderHook } from "@testing-library/react-hooks"
import useOidcAuth from "./useOidcAuth"

describe("useOidcAuth", () => {
  it("throws an error if params are missing", () => {
    expect(() => {
      const { result } = renderHook(() => useOidcAuth())
      // read error to run this hook
      const error = result.current.error
    }).toThrow("Cannot read property 'clientID' of undefined")
  })

  it("throws an error if clientID is missing", () => {
    expect(() => {
      const { result } = renderHook(() => useOidcAuth({}))
      // read error to run this hook
      const error = result.current.error
    }).toThrow("clientID is undefined. Please provide a clientID.")
  })

  it("throws an error if issuerURL is missing", () => {
    expect(() => {
      const { result } = renderHook(() => useOidcAuth({ clientID: "test" }))
      // read error to run this hook
      const error = result.current.error
    }).toThrow("issuerURL is undefined. Please provide a issuerURL.")
  })

  // it("get jwt from provider", () => {
  //   const { result } = renderHook(() =>
  //     useOidcAuth({ clientID: "test", issuerURL: "" })
  //   )

  //   expect(result.current).toBeDefined()
  // })
})
