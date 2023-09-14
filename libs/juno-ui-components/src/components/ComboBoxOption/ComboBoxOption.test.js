import * as React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ComboBox } from "../ComboBox/"
import { ComboBoxOption } from "../ComboBoxOption/"


describe("ComboBoxOption", () => {
  
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  
  test("renders a ComboBoxOption", async () => {
    render(
      <ComboBox>
        <ComboBoxOption value="Option 1" />
      </ComboBox>
    )
    const toggle = screen.getByRole("button")
    expect(toggle).toBeInTheDocument()
    await userEvent.click(toggle)
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveTextContent("Option 1")
  })
  
  test("renders a className as passed", async () => {
    render(
      <ComboBox>
        <ComboBoxOption className="my-fancy-class"/>
      </ComboBox>
    )
    const toggle = screen.getByRole("button")
    expect(toggle).toBeInTheDocument()
    await userEvent.click(toggle)
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveClass("my-fancy-class")
  })
  
  test("renders all props as passed", async () => {
    render(
      <ComboBox>
        <ComboBoxOption data-lolol="123"/>
      </ComboBox>
    )
    const toggle = screen.getByRole("button")
    expect(toggle).toBeInTheDocument()
    await userEvent.click(toggle)
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveAttribute("data-lolol", "123")
  })
  
})