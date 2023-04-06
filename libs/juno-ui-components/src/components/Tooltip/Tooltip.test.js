import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Tooltip } from "./index"

describe("Tooltip", () => {
  test("render a Tooltip", async () => {
    await render(<Tooltip>TEST</Tooltip>)
    // screen.debug()
    expect(screen.getByText(/TEST/i)).toBeInTheDocument()
  })
})
