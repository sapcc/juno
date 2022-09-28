import * as React from "react"
import { render, screen } from "@testing-library/react"
import { BreadcrumbItem } from "./index"


describe("BreadcrumbItem", () => {
  
  test("renders a breadcrumb item with text as passed", async () => {
  render(<BreadcrumbItem data-testid="breadcrumbitem" />)
  expect(screen.getByTestId("breadcrumbitem")).toBeInTheDocument()
  expect(screen.getByTestId("breadcrumbitem")).toHaveClass("juno-breadcrumb-item")
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