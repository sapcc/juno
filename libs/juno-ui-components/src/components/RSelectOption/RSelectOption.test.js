import * as React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import { RSelect } from "../RSelect/index"
import { RSelectOption } from "../RSelectOption/index"


describe("SelectOption", () => {
  
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  
  test("renders a SelectOptionGroup", async () => {
    render(
      <RSelect open>
        <RSelectOption />
      </RSelect>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
  })
  
  test("renders a label as passed", async () => {
    render(
      <RSelect open>
        <RSelectOption label="my-option"/>
      </RSelect>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveTextContent("my-option")
  })
  
  test("renders children as passed", async () => {
    const child = "my-child-label"
    render(
      <RSelect open>
        <RSelectOption>{child}</RSelectOption>
      </RSelect>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveTextContent("my-child-label")
  })
  
  test("renders children instead of label if both children and label are being passed", async () => {
    const child = "my-child-label"
    render(
      <RSelect open>
        <RSelectOption label="my-label">{child}</RSelectOption>
      </RSelect>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveTextContent("my-child-label")
    expect(screen.getByRole("option")).not.toHaveTextContent("my-label")
  })
  
  test("renders a className as passed", async () => {
    render(
      <RSelect open>
        <RSelectOption className="my-fancy-class"/>
      </RSelect>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveClass("my-fancy-class")
  })
  
  test("renders all props as passed", async () => {
    render(
      <RSelect open>
        <RSelectOption data-lolol="123"/>
      </RSelect>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveAttribute("data-lolol", "123")
  })
  
})