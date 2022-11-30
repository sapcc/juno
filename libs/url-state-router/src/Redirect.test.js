/**
 * @jest-environment jsdom
 */

import React from "react"
import { renderHook } from "@testing-library/react-hooks"
import { useRouter } from "./RouterContext"
import Router from "./Router.js"
import Redirect from "./Redirect.js"

describe("Redirect", () => {
  it("redirects", () => {
    const wrapper = ({ children }) => (
      <Router stateID="app">
        <Redirect to="/items/new" />
        {children}
      </Router>
    )
    const { result } = renderHook(() => useRouter(), { wrapper })

    expect(result.current.currentPath).toEqual("/items/new")
  })
})
