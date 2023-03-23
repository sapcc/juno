import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from 'react-dom/test-utils'
import { Select } from "./index"
import { SelectOption } from "../SelectOption/index"

/** 
Testing user interactions
---
Testing user interactions with radix and jest seems hard and requires some mocking / polyfilling fpr ResizeObserver as per the below issues.
Otherwise tests will fail with "ResizeObserver is not defined".

https://github.com/radix-ui/primitives/issues/856
https://github.com/radix-ui/primitives/issues/1822
https://github.com/ZeeCoder/use-resize-observer/issues/40
https://stackoverflow.com/questions/64558062/how-to-mock-resizeobserver-to-work-in-unit-tests-using-react-testing-library

*/

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("Select", () => {
  
  test("renders a Select", async () => {
    render(<Select />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute('type', "button")
    expect(screen.getByRole("combobox")).toHaveClass("juno-select")
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
  
  test("renders a valid Select as passed", async () => {
    render(<Select valid />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-valid")
  })
  
  test("renders an invalid Select as passed", async () => {
    render(<Select invalid />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-invalid")
  })
  
  test("renders loading Select with a Spinner as passed", async () => {
    render(<Select loading />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-loading")
    // query the DOM directly as Radix-ui add aria-hidden to the icons in the select:
    expect(document.querySelector(".juno-spinner")).toBeInTheDocument()
  })
  
  test("renders a Select in error state as passed", async () => {
    render(<Select error />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-error")
  })
  
  test("renders an open Select as passed", async () => {
    // Using the cheap mock above:
    window.ResizeObserver = ResizeObserver;
    render(<Select open onOpenChange={ () => {} }>
      <SelectOption value="1"></SelectOption>
    </Select>)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
  })
  
  test("renders a placeholder as passed", async () => {
    render(<Select placeholder="my-placeholder" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveTextContent("my-placeholder")
  })
  
  test("sets a value for a controlled Select as passed", async () => {
    render(
      <Select value="2">
        <SelectOption value="1">Option 1</SelectOption>
        <SelectOption value="2">Option 2</SelectOption>
        <SelectOption value="3">Option 3</SelectOption>
      </Select>
    )
    expect(screen.getByRole("combobox")).not.toHaveTextContent("Option 1")
    expect(screen.getByRole("combobox")).toHaveTextContent("Option 2")
    expect(screen.getByRole("combobox")).not.toHaveTextContent("Option 3")    
  })
  
  test("sets a defaultValue for an uncontrolled Select as passed", async () => {
    render(
      <Select defaultValue="2">
        <SelectOption value="1">Option 1</SelectOption>
        <SelectOption value="2">Option 2</SelectOption>
        <SelectOption value="3">Option 3</SelectOption>
      </Select>
    )
    expect(screen.getByRole("combobox")).not.toHaveTextContent("Option 1")
    expect(screen.getByRole("combobox")).toHaveTextContent("Option 2")
    expect(screen.getByRole("combobox")).not.toHaveTextContent("Option 3")    
  })
  
  test.skip("allows user to open a Select by clicking", async () => {
    render(
      <Select>
        <SelectOption value="1">Option 1</SelectOption>
        <SelectOption value="2">Option 2</SelectOption>
        <SelectOption value="3">Option 3</SelectOption>
      </Select>
    )
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole("combobox"))
    // Test does not find an element with role="listbox"?
    expect(screen.getByRole("listbox")).toBeInTheDocument()
  })
  
  test.skip("allows user to select a value on an uncontrolled Select", async () => {
    
  })
  
  test.skip("allows user to select a value on a controlled Select", async () => {
    
  })
  
  test.skip("allows user to change a value on an uncontrolled Select", async () => {
    
  })
  
  test.skip("allows user to change a value on a controlled Select", async () => {
    
  })
  
})