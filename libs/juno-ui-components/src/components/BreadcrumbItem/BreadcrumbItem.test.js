import * as React from "react"
import { render, screen } from "@testing-library/react"
import { BreadcrumbItem } from "./index"


describe("BreadcrumbItem", () => {
  
  test("renders a breadcrumb item with text as passed", async () => {
  render(<BreadcrumbItem data-testid="breadcrumbitem" />)
  expect(screen.getByTestId("breadcrumbitem")).toBeInTheDocument()
  expect(screen.getByTestId("breadcrumbitem")).toHaveClass("juno-breadcrumb-item")
  })
  
  test.skip("returns children as passed", async () => {
    
  })
  
  test("renders an icon as passed", async () => {
    render(<BreadcrumbItem icon="help" />)
    expect(screen.getByRole("img")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute("title", "Help")
  })
  
  test("renders a label as passed", async () => {
    render(<BreadcrumbItem data-testid="breadcrumbitem" label="My Item" />)
    expect(screen.getByTestId("breadcrumbitem")).toBeInTheDocument()
    expect(screen.getByTestId("breadcrumbitem")).toHaveTextContent("My Item")
  })
  
  test("renders an aria-label as passed", async () => {
    render(<BreadcrumbItem href="#"  ariaLabel="My Item" />)
    expect(screen.getByRole("link")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute("aria-label", "My Item")
  })
  
  test("renders the label as aria-label by default", async () => {
    render(<BreadcrumbItem href="#" label="My Item" />)
    expect(screen.getByRole("link")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute("aria-label", "My Item")
  })
  
  test.skip("renders an active item as passed", async () => {
    
  })
  
  test.skip("renders a disabled item as passed", async () => {
    
  })
  
  test.skip("executes an onClick handler as passed", async () => {
    
  })
  
  test("renders a custom className as passed", async () => {
    render(<BreadcrumbItem data-testid="breadcrumbitem" className="my-custom-class" />)
    expect(screen.getByTestId("breadcrumbitem")).toBeInTheDocument()
    expect(screen.getByTestId("breadcrumbitem")).toHaveClass('my-custom-class')
  })
  
  test("renders all props as passed", async () => {
    render(<BreadcrumbItem data-testid="breadcrumbitem" data-lolol={true}/>)
    expect(screen.getByTestId("breadcrumbitem")).toBeInTheDocument()
    expect(screen.getByTestId("breadcrumbitem")).toHaveAttribute('data-lolol')
  })
  
})