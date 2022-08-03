import * as React from "react"
import { render, screen } from "@testing-library/react"
import { LoadingIndicator } from "./index"

describe("LoadingIndicator", () => {
	
  test("renders a LoadingIndicator", async () => {
	render(<LoadingIndicator />)
	expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })
  
  test("renders a LoadingIndicator with a size as passed", async () => {
	  render(<LoadingIndicator size="1000" />)
	  expect(screen.getByRole("progressbar")).toBeInTheDocument()
	  expect(screen.getByRole("progressbar")).toHaveAttribute("width", "1000")
	  expect(screen.getByRole("progressbar")).toHaveAttribute("height", "1000")
	})
	  
  test("renders a LoadingIndicator with a color as passed", async () => {
		render(<LoadingIndicator color="jn-text-danger" />)
		expect(screen.getByRole("progressbar")).toBeInTheDocument()
		expect(screen.getByRole("progressbar")).toHaveClass("jn-text-danger")
	})
  
})
