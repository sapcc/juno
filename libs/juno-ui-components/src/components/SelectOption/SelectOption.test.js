import * as React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import { Select } from "../Select/index"
import { SelectOption } from "../SelectOption/index"


describe("SelectOption", () => {
  
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  
  test("renders a SelectOptionGroup", async () => {
    render(
      <Select open>
        <SelectOption />
      </Select>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
  })
  
  test("renders a label as passed", async () => {
    render(
      <Select open>
        <SelectOption label="my-option"/>
      </Select>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveTextContent("my-option")
  })
  
  test("renders children as passed", async () => {
    const child = "my-child-label"
    render(
      <Select open>
        <SelectOption>{child}</SelectOption>
      </Select>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveTextContent("my-child-label")
  })
  
  test("renders children instead of label if both children and label are being passed", async () => {
    const child = "my-child-label"
    render(
      <Select open>
        <SelectOption label="my-label">{child}</SelectOption>
      </Select>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveTextContent("my-child-label")
    expect(screen.getByRole("option")).not.toHaveTextContent("my-label")
  })
  
  test("renders a className as passed", async () => {
    render(
      <Select open>
        <SelectOption className="my-fancy-class"/>
      </Select>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveClass("my-fancy-class")
  })
  
  test("renders all props as passed", async () => {
    render(
      <Select open>
        <SelectOption data-lolol="123"/>
      </Select>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveAttribute("data-lolol", "123")
  })
  
})