import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { act } from 'react-dom/test-utils'
import { Select } from "./index"
import { SelectOption } from "../SelectOption/index"


describe("Select", () => {
  
  test("renders a Select", async () => {
    render(<Select />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute('type', "button")
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-trigger")
  })
  
  test("renders an aria-label as passed", async () => {
    render(<Select ariaLabel="my-select" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute('aria-label', "my-select")
  })
  
  test("renders a custom className to the Select trigger", async () => {
    render(<Select className="my-class" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("my-class")
  })
  
  test("renders a disabled Select as passed", async () => {
    render(<Select disabled />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toBeDisabled()
  })
  
  test("renders an open Select as passed", async () => {
    render(<Select open>
      <SelectOption value="1"></SelectOption>
    </Select>)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("listbox")).toBeInTheDocument()
  })
  
  test("renders a placeholder as passed", async () => {
    render(<Select placeholder="my-placeholder" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveTextContent("my-placeholder")
  })
  
})