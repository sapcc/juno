import * as React from "react"
import { cleanup, render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from 'react-dom/test-utils'
import { Select } from "./index"
import { SelectOption } from "../SelectOption/index"

const mockOnValueChange = jest.fn()
const mockOnOpenChange = jest.fn()
const mockOnChange = jest.fn()

const SelectParent = ({
    value, 
    onChange,
    children,
    ...props
  }) => {
  const [val, setVal] = React.useState(value)
  
  const handleChange = (v) => {
    onChange()
    setVal(v)
  }
  
  return (
    <>
      <Select value={val} onValueChange={handleChange} {...props}>
        { children }
      </Select>
    </>
  )
}

describe("Select", () => {
  
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })
  
  test("renders a Select", async () => {
    render(<Select />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute('type', "button")
    expect(screen.getByRole("combobox")).toHaveClass("juno-select")
  })
  
  test("renders a Select with a label as passed", async () => {
    render(<Select label="My Label" id="my-select"/>)
    expect(document.querySelector(".juno-label")).toBeInTheDocument()
    expect(document.querySelector(".juno-label")).toHaveTextContent("My Label")
  })
  
  test("renders a Select with an id as passed", async () => {
    render(<Select id="select-1" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute("id", "select-1")
  })
  
  test("renders Select with a generated unique id if no id was passed", async () => {
    render(<Select />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute("id")
    expect(screen.getByRole("combobox").getAttribute("id")).toMatch("juno-select")
  })
  
  test("renders a Select with an associated label with an id as passed", async () => {
    render(<Select id="my-select" label="My Select"/>)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByLabelText("My Select")).toBeInTheDocument()
    expect(document.querySelector(".juno-label")).toBeInTheDocument()
    expect(document.querySelector(".juno-label")).toHaveTextContent("My Select")
  })
  
  test("renders a Select with a label associated by an auto-generated id if no id was passed ", async () => {
    render(<Select label="This is a Select" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByLabelText("This is a Select")).toBeInTheDocument()
  })
  
  test("renders a required marker as passed", async () => {
    render(<Select label="My Label" required={true} />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(document.querySelector(".juno-required")).toBeInTheDocument()
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
    expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
  })
  
  test("renders an invalid Select as passed", async () => {
    render(<Select invalid />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-invalid")
    expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
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
  
  test("renders a subdued Select variant as passed", async () => {
    render(<Select variant="subdued" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-subdued")
  })
  
  test("renders a primary Select variant as passed", async () => {
    render(<Select variant="primary" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-primary")
  })
  
  test("renders a primary-danger Select variant as passed", async () => {
    render(<Select variant="primary-danger" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-primary-danger")
  })
  
  test("does not render semantic classes when in loading state as passed", async () => {
    render(<Select variant="primary-danger" loading />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).not.toHaveClass("juno-select-primary-danger")
  })
  
  test("does not render semantic classes when in error state as passed", async () => {
    render(<Select variant="primary-danger" error />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).not.toHaveClass("juno-select-primary-danger")
  })
  
  test("does not render semantic classes when validated as passed", async () => {
    render(<Select variant="primary-danger" valid />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).not.toHaveClass("juno-select-primary-danger")
  })
  
  test("does not render semantic classes when invalidated as passed", async () => {
    render(<Select variant="primary-danger" invalid />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).not.toHaveClass("juno-select-primary-danger")
  })
  
  test("renders an open Select as passed", async () => {
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
  
  test("renders a helptext as passed", async () => {
    render(<Select helptext="this is a helptext"/>)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-help")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("this is a helptext")
  })
  
  test("renders a successtext as passed and validates the Element", async () => {
    render(<Select successtext="great success!" />)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-success")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("great success!")
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-valid")
  })
  
  test("renders an errortext as passed and invalidates the Element", async () => {
    render(<Select errortext="this is an error!" />)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-error")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("this is an error!")
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-invalid")
  })
  
  test("renders non-truncated Select Options by default", async () => {
    render(
      <Select open>
        <SelectOption value="1">Option 1</SelectOption>
      </Select>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).not.toHaveClass("juno-select-option-truncate")
  })
  
  test("renders truncated Select Options as passed", async () => {
    render(
      <Select truncateOptions open>
        <SelectOption value="1">Option 1</SelectOption>
      </Select>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveClass("juno-select-option-truncate")
  })
  
  test("allows user to open a Select by clicking on it", async () => {
    render(
      <Select onOpenChange={mockOnOpenChange}>
        <SelectOption value="1">Option 1</SelectOption>
        <SelectOption value="2">Option 2</SelectOption>
        <SelectOption value="3">Option 3</SelectOption>
      </Select>
    )
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole("combobox"))
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    expect(mockOnOpenChange).toHaveBeenCalled()
  })
  
  test("allows user to change a value on an uncontrolled Select", async () => {
    render(
      <Select defaultValue="val-1" onValueChange={mockOnValueChange}>
        <SelectOption value="val-1">Option 1</SelectOption>
        <SelectOption value="val-2">Option 2</SelectOption>
        <SelectOption value="val-3">Option 3</SelectOption>
      </Select>
    )
    const select = screen.getByRole("combobox")
    expect(select).toBeInTheDocument()
    expect(select).toHaveTextContent("Option 1")
    await userEvent.click(select)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("option", { name: "Option 2" }))
    expect(select).toHaveTextContent("Option 2")
    expect(mockOnValueChange).toHaveBeenCalledWith("val-2")
  })
  
  test("allows user to change a value on a controlled Select", async () => {
    render(
      <SelectParent value="val-2" onChange={mockOnValueChange}>
        <SelectOption value="val-1">Option 1</SelectOption>
        <SelectOption value="val-2">Option 2</SelectOption>
        <SelectOption value="val-3">Option 3</SelectOption>
      </SelectParent>
    )
    const select = screen.getByRole("combobox")
    expect(select).toBeInTheDocument()
    expect(select).toHaveTextContent("Option 2")
    await userEvent.click(select)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("option", { name: "Option 3" }))
    expect(select).toHaveTextContent("Option 3")
    expect(mockOnValueChange).toHaveBeenCalled()
  })
  
  test("executes an onChange handler when selected value changes", async () => {
    render(
      <SelectParent onChange={mockOnChange} >
        <SelectOption value="val-1">Option 1</SelectOption>
        <SelectOption value="val-2">Option 2</SelectOption>
      </SelectParent>
    )
    const select = screen.getByRole("combobox")
    expect(select).toBeInTheDocument()
    await userEvent.click(select)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("option", { name: "Option 2" }))
    expect(mockOnChange).toHaveBeenCalled()
  })
  
  
  test("renders a className to the Select trigger button as passed", async () => {
    render(
      <Select className="my-select-class">
        <SelectOption value="1">Option 1</SelectOption>
        <SelectOption value="2">Option 2</SelectOption>
        <SelectOption value="3">Option 3</SelectOption>
      </Select>
    )
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("my-select-class")
  })
  
  test("renders all props as passed", async () => {
    render(
      <Select data-lolol="123">
        <SelectOption value="1">Option 1</SelectOption>
        <SelectOption value="2">Option 2</SelectOption>
        <SelectOption value="3">Option 3</SelectOption>
      </Select>
    )
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute("data-lolol", "123")
  })
  
})