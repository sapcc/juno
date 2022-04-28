import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Badge } from "./index"


describe("Badge", () => {
	
  test("renders a badge with text as passed", async () => {
	render(<Badge text="default badge" data-testid="badge" />)
	expect(screen.getByTestId("badge")).toBeInTheDocument()
	expect(screen.getByTestId("badge")).toHaveTextContent("default badge")
  })
  
  test("renders a badge with children", async () => {
	render(<Badge data-testid="badge" >Children inside</Badge>)
	expect(screen.getByTestId("badge")).toBeInTheDocument()
	expect(screen.getByTestId("badge")).toHaveTextContent("Children inside")
  })
  
  test("renders an info badge variant as passed", async () => {
		render(<Badge variant="info" data-testid="badge" />)
		expect(screen.getByTestId("badge")).toBeInTheDocument()
		expect(screen.getByTestId("badge")).toHaveClass("juno-badge-info")
	})
  
  test("renders a success badge variant as passed", async () => {
	  render(<Badge variant="success" data-testid="badge" />)
	  expect(screen.getByTestId("badge")).toBeInTheDocument()
	  expect(screen.getByTestId("badge")).toHaveClass("juno-badge-success")
  })
  
  test("renders a warning badge variant as passed", async () => {
	render(<Badge variant="warning" data-testid="badge" />)
	expect(screen.getByTestId("badge")).toBeInTheDocument()
	expect(screen.getByTestId("badge")).toHaveClass("juno-badge-warning")
})

  test("renders a danger badge variant as passed", async () => {
	render(<Badge variant="danger" data-testid="badge" />)
	expect(screen.getByTestId("badge")).toBeInTheDocument()
	expect(screen.getByTestId("badge")).toHaveClass("juno-badge-danger")
})

  test("renders an error badge variant as passed", async () => {
	render(<Badge variant="error" data-testid="badge" />)
	expect(screen.getByTestId("badge")).toBeInTheDocument()
	expect(screen.getByTestId("badge")).toHaveClass("juno-badge-error")
})
  
  test("renders all props as passed", async () => {
	  render(<Badge data-testid="badge" data-lolol={true}/>)
	  expect(screen.getByTestId("badge")).toBeInTheDocument()
	  expect(screen.getByTestId("badge")).toHaveAttribute('data-lolol')
  })
  
})

