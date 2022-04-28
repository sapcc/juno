import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Badge } from "./index"


describe("Badge", () => {
	
  test("renders a badge with text as passed", async () => {
	render(<Badge text="default badge" data-testid="badge" />)
	expect(screen.getByTestId("badge")).toBeInTheDocument()
	expect(screen.getByTestId("badge")).toHaveTextContent("default badge")
  })
  
  test("renders all props as passed", async () => {
	  render(<Badge data-testid="badge" data-lolol={true}/>)
	  expect(screen.getByTestId("badge")).toBeInTheDocument()
	  expect(screen.getByTestId("badge")).toHaveAttribute('data-lolol')
  })
  
})

