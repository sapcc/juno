import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Stack } from "./index"

describe("Stack", () => {
  
  test("renders a Stack and has flexbox layout", async () => {
		render(<Stack data-testid="my-stack"></Stack>)
		expect(screen.getByTestId("my-stack")).toBeInTheDocument()
		expect(screen.getByTestId("my-stack")).toHaveClass(
      "flex"
    )
	})

  test("renders a default Stack, stacked horizontally, no gap", async () => {
		render(<Stack data-testid="my-stack"></Stack>)
		expect(screen.getByTestId("my-stack")).toBeInTheDocument()
    expect(screen.getByTestId("my-stack")).toHaveClass(
      "flex-row",
      "gap-0"
    )
	})

  test("renders a vertical Stack, no gap", async () => {
		render(<Stack data-testid="my-stack" direction="vertical"></Stack>)
		expect(screen.getByTestId("my-stack")).toBeInTheDocument()
    expect(screen.getByTestId("my-stack")).toHaveClass(
      "flex-col",
      "gap-0"
    )
	})

  test("renders a Stack with gap 4", async () => {
		render(<Stack data-testid="my-stack" gap={4}></Stack>)
		expect(screen.getByTestId("my-stack")).toBeInTheDocument()
    expect(screen.getByTestId("my-stack")).toHaveClass(
      "gap-4"
    )
	})


})
