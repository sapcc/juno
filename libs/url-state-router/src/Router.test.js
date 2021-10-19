/**
 * @jest-environment jsdom
 */

import React from "react"
import { render } from "@testing-library/react"
import Router from "./Router"

describe("Router", () => {
  it("render component", () => {
    render(<Router stateID="app1" />)
  })
})
