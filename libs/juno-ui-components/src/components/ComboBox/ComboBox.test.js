import * as React from "react"
import { cleanup, render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { ComboBox } from "./index"
import { ComboBoxOption } from "../ComboBoxOption/index"

describe("ComboBox", () => {
  
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })
  
  test("renders a ComboBox", async () => {
    render(<ComboBox />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute('type', "text")
    expect(screen.getByRole("combobox")).toHaveClass("juno-combobox-input")
  })
  
  test("renders a ComboBox with a label as passed", async () => {
    render(<ComboBox label="My Label"/>)
    expect(document.querySelector(".juno-label")).toBeInTheDocument()
    expect(document.querySelector(".juno-label")).toHaveTextContent("My Label")
  })
  
  test("renders a ComboBox with a custom className as passed", async () => {
    render(<ComboBox className="my-combobox" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("my-combobox")
  })
  
  
})