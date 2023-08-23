import * as React from "react"
import { cleanup, render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from 'react-dom/test-utils'
import { Select } from "./index"
import { SelectOption } from "../SelectOption/index"

const mockOnChange = jest.fn()

describe("Select", () => {
  
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })
  
  test("renders a Select toggle", async () => {
    render(<Select />)
    expect(screen.getByRole("button")).toHaveAttribute('type', "button")
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass("juno-select-toggle")
  })
  
  test("renders a Select with a label as passed", async () => {
    render(<Select label="My Label" />)
    expect(document.querySelector(".juno-label")).toBeInTheDocument()
    expect(document.querySelector(".juno-label")).toHaveTextContent("My Label")
  })
  
  test("renders a placeholder as passed", async () => {
    render(<Select placeholder="my-placeholder" />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveTextContent("my-placeholder")
  })
  
  test("renders a Select toggle with an id as passed", async () => {
    render(<Select id="select-1" />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute("id", "select-1")
  })
  
  test("renders a Select toggle with a generated unique id if no id was passed", async () => {
    render(<Select />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute("id")
    expect(screen.getByRole("button").getAttribute("id")).toMatch("juno-select-")
  })
  
  test("renders a Select toggle with an associated label with an id as passed", async () => {
    render(<Select id="my-select" label="My Select"/>)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByLabelText("My Select")).toBeInTheDocument()
    expect(screen.getByLabelText("My Select")).toHaveClass("juno-select-toggle")
  })
  
  test("renders a Select toggle with a label associated by an auto-generated id if no id was passed ", async () => {
    render(<Select label="This is a Select" />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByLabelText("This is a Select")).toBeInTheDocument()
    expect(screen.getByLabelText("This is a Select")).toHaveClass("juno-select-toggle")
  })
  
  test("renders a required marker as passed", async () => {
    render(<Select label="My Select" required={true} />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(document.querySelector(".juno-label")).toHaveTextContent("My Select")
    expect(document.querySelector(".juno-required")).toBeInTheDocument()
  })
  
  test("renders an aria-label as passed", async () => {
    render(<Select ariaLabel="my-select" />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute('aria-label', "my-select")
  })
  
  test("renders a custom className to the Select toggle", async () => {
    render(<Select className="my-class" />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass("my-class")
  })
  
  test("renders a disabled Select as passed", async () => {
    render(<Select disabled />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeDisabled()
  })
  
  test.skip("renders a valid Select as passed", async () => {
    render(<Select valid />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass("juno-select-valid")
    expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
  })
  
  test.skip("renders an invalid Select as passed", async () => {
    render(<Select invalid />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass("juno-select-invalid")
    expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
  })
  
  test("renders loading Select with a Spinner as passed", async () => {
    render(<Select loading />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass("juno-select-loading")
    expect(document.querySelector(".juno-spinner")).toBeInTheDocument()
  })
  
  test("renders a Select in error state as passed", async () => {
    render(<Select error />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass("juno-select-error")
  })
  
  test("executes an onChange handler when the selected value changes", async () => {
    render(
      <Select onChange={mockOnChange} >
        <SelectOption value="Option-1">Option 1</SelectOption>
      </Select>
    )
    const toggle = screen.getByRole("button")
    expect(toggle).toBeInTheDocument()
    await userEvent.click(toggle)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("option"))
    expect(mockOnChange).toHaveBeenCalled()
  })
  
})