import * as React from "react"
import { render, screen } from "@testing-library/react"
import { SelectOptionGroup } from "./index"
import { SelectOption } from "../SelectOption/index"


describe("SelectOptionGroup", () => {
  
  test("renders a SelectOptionGroup", async () => {
    render(<SelectOptionGroup data-testid="select-option-group" />)
    expect(screen.getByTestId("select-option-group")).toBeInTheDocument()
    expect(screen.getByTestId("select-option-group")).toHaveClass("juno-select-option-group")
  })
  
  test("renders a label as passed", async () => {
    render(<SelectOptionGroup data-testid="select-option-group" label="my own select option label"/>)
    expect(screen.getByTestId("select-option-group")).toBeInTheDocument()
    expect(screen.getByTestId("select-option-group")).toHaveTextContent("my own select option label")
  })
  
  test("renders a className as passed", async () => {
    render(<SelectOptionGroup data-testid="select-option-group" className="my-class"/>)
    expect(screen.getByTestId("select-option-group")).toBeInTheDocument()
    expect(screen.getByTestId("select-option-group")).toHaveClass("my-class")
  })
  
  test("renders all pops as passed", async () => {
    render(<SelectOptionGroup data-testid="select-option-group" data-lolol="123" />)
    expect(screen.getByTestId("select-option-group")).toBeInTheDocument()
    expect(screen.getByTestId("select-option-group")).toHaveAttribute("data-lolol", "123")
  })
  
})