import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Button } from "./index"

describe("Button", () => {
  
  test("renders a button with text passed as label", async () => {
    render(<Button data-testid="button" label="Click me"></Button>)
    expect(screen.getByTestId("button")).toBeInTheDocument()
  })
  
  test("renders a button with text passed as children", async () => {
    render(<Button data-testid="button">Click me</Button>)
    expect(screen.getByTestId("button")).toBeInTheDocument()
  })
  
  test("renders a default button with text", async () => {
    render(<Button data-testid="button">Click me</Button>)
    expect(screen.getByTestId("button")).toBeInTheDocument()
    expect(screen.getByTestId("button")).toHaveClass(
      "text-theme-on-default",
      "bg-theme-default"
    )
  })
  
  test("renders a primary button with text", async () => {
    render(<Button data-testid="button" variant="primary">Click me</Button>)
    expect(screen.getByTestId("button")).toBeInTheDocument()
    expect(screen.getByTestId("button")).toHaveClass(
      "text-theme-on-primary",
      "bg-theme-primary"
    )
  })

  test("renders a danger button with text", async () => {
    render(<Button data-testid="button" variant="danger">Click me</Button>)
    expect(screen.getByTestId("button")).toBeInTheDocument()
    expect(screen.getByTestId("button")).toHaveClass(
      "text-theme-on-danger",
      "bg-theme-danger"
    )
  })
})
