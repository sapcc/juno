import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Tooltip } from "../Tooltip/index.js"
import { TooltipContent } from "./index"

describe("TooltipContent", () => {
  test("render a TooltipContent", async () => {
    const { container } = await render(
      <Tooltip initialOpen={true}>
        <TooltipContent className="test-tooltip-content">TEST</TooltipContent>
      </Tooltip>
    )
    // screen.debug()
    expect(
      container.querySelector('[class~="test-tooltip-content"]')
    ).toBeInTheDocument()
  })
})
