/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderHook } from "@testing-library/react-hooks"
import { useRouter } from "./RouterContext"
import Router from "./Router"
import Link from "./Link"

describe("Link", () => {
  beforeEach(() => {
    render(
      <Router stateID="app">
        <Link to="/items/10">My Link</Link>
      </Router>
    )
  })

  it("renders an anker tag", () => {
    expect(() => {
      const anker = screen.getByText("My Link")
      expect(anker.nodeName).toEqual("A")
    }).not.toThrow()
  })

  it("navigate on click", async () => {
    const wrapper = ({ children }) => <Router stateID="app">{children}</Router>
    const { result } = renderHook(() => useRouter(), { wrapper })

    const link = await screen.getByText("My Link")
    await userEvent.click(link)

    expect(result.current.currentPath).toEqual("/items/10")
  })
})
