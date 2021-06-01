import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Button } from "./index"

describe("Button", () => {
  
  test("renders a button with text passed as label", async () => {
    render(<Button label="Click me"></Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveTextContent("Click me")
  })
  
  test("renders a button with text passed as children", async () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveTextContent("Click me")
  })
  
  test("renders a default button", async () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass(
      "text-theme-on-default",
      "bg-theme-default"
    )
  })
  
  test("renders a primary button", async () => {
    render(<Button variant="primary">Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass(
      "text-theme-on-primary",
      "bg-theme-primary"
    )
  })

  test("renders a danger button", async () => {
    render(<Button variant="danger">Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass(
      "text-theme-on-danger",
      "bg-theme-danger"
    )
  })

  test("renders a small button", async () => {
    render(<Button size="small">Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass(
      "px-2"
    )
  })
  
  test("renders a default sized button", async () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass(
      "px-4"
    )
  })
  
  test("renders a large button", async () => {
    render(<Button size="large">Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass(
      "px-6"
    )
  })

})
