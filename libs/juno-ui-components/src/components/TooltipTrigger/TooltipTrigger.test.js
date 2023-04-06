import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Tooltip } from "../Tooltip/index.js"
import { TooltipContent } from "../TooltipContent/index.js"
import { TooltipTrigger } from "./index"

describe("TooltipTrigger", () => {
  test("render a TooltipTrigger", async () => {
    await render(
      <Tooltip initialOpen={true}>
        <TooltipTrigger>Click me to show tooltip</TooltipTrigger>
        <TooltipContent>TEST</TooltipContent>
      </Tooltip>
    )
    // screen.debug()
    expect(screen.getByText("Click me to show tooltip")).toBeInTheDocument()
  })
})
