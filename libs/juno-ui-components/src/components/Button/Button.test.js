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

  test('onclick handler is called as passed', () => {
    const onClickSpy = jest.fn();
    render(<Button onClick={onClickSpy} />);
    screen.getByRole('button').click();
    expect(onClickSpy).toHaveBeenCalled();
  })

  test('onclick handler is not called when disabled', () => {
    const onClickSpy = jest.fn();
    render(<Button disabled onClick={onClickSpy} />);
    screen.getByRole('button').click();
    expect(onClickSpy).not.toHaveBeenCalled();
  })

  test("renders a title", async () => {
    render(<Button title="Click me title">Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute('title', "Click me title")
  })

  test("renders label as title if no title given", async () => {
    render(<Button label="Click me label">Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute('title', "Click me label")
  })

  test("renders 'unspecifed button' as title if no title and no label given", async () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute('title', "unspecified button")
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

  test("renders a disabled button", async () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute('disabled')
  })

  test("renders a small button", async () => {
    render(<Button size="small">Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass(
      "px-sm"
    )
  })
  
  test("renders a default sized button", async () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass(
      "px-md"
    )
  })
  
  test("renders a large button", async () => {
    render(<Button size="large">Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass(
      "px-lg"
    )
  })

})
