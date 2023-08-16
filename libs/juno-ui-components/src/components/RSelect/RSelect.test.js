import * as React from "react"
import { cleanup, render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from 'react-dom/test-utils'
import { RSelect } from "./index"
import { RSelectOption } from "../RSelectOption/index"

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
      <RSelect value={val} onValueChange={handleChange} {...props}>
        { children }
      </RSelect>
    </>
  )
}

describe("Select", () => {
  
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })
  
  test("renders a Select", async () => {
    render(<RSelect />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute('type', "button")
    expect(screen.getByRole("combobox")).toHaveClass("juno-select")
  })
  
  test("renders a Select with a label as passed", async () => {
    render(<RSelect label="My Label" id="my-select"/>)
    expect(document.querySelector(".juno-label")).toBeInTheDocument()
    expect(document.querySelector(".juno-label")).toHaveTextContent("My Label")
  })
  
  test("renders a Select with an id as passed", async () => {
    render(<RSelect id="select-1" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute("id", "select-1")
  })
  
  test("renders Select with a generated unique id if no id was passed", async () => {
    render(<RSelect />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute("id")
    expect(screen.getByRole("combobox").getAttribute("id")).toMatch("juno-select")
  })
  
  test("renders a Select with an associated label with an id as passed", async () => {
    render(<RSelect id="my-select" label="My Select"/>)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByLabelText("My Select")).toBeInTheDocument()
    expect(document.querySelector(".juno-label")).toBeInTheDocument()
    expect(document.querySelector(".juno-label")).toHaveTextContent("My Select")
  })
  
  test("renders a Select with a label associated by an auto-generated id if no id was passed ", async () => {
    render(<RSelect label="This is a Select" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByLabelText("This is a Select")).toBeInTheDocument()
  })
  
  test("renders a required marker as passed", async () => {
    render(<RSelect label="My Label" required={true} />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(document.querySelector(".juno-required")).toBeInTheDocument()
  })
  
  test("renders an aria-label as passed", async () => {
    render(<RSelect ariaLabel="my-select" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute('aria-label', "my-select")
  })
  
  test("renders a custom className to the Select trigger", async () => {
    render(<RSelect className="my-class" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("my-class")
  })
  
  test("renders a disabled Select as passed", async () => {
    render(<RSelect disabled />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toBeDisabled()
  })
  
  test("renders a valid Select as passed", async () => {
    render(<RSelect valid />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-valid")
    expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
  })
  
  test("renders an invalid Select as passed", async () => {
    render(<RSelect invalid />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-invalid")
    expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
  })
  
  test("renders loading Select with a Spinner as passed", async () => {
    render(<RSelect loading />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-loading")
    // query the DOM directly as Radix-ui add aria-hidden to the icons in the select:
    expect(document.querySelector(".juno-spinner")).toBeInTheDocument()
  })
  
  test("renders a Select in error state as passed", async () => {
    render(<RSelect error />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-error")
  })
  
  test("renders a subdued Select variant as passed", async () => {
    render(<RSelect variant="subdued" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-subdued")
  })
  
  test("renders a primary Select variant as passed", async () => {
    render(<RSelect variant="primary" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-primary")
  })
  
  test("renders a primary-danger Select variant as passed", async () => {
    render(<RSelect variant="primary-danger" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-primary-danger")
  })
  
  test("does not render semantic classes when in loading state as passed", async () => {
    render(<RSelect variant="primary-danger" loading />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).not.toHaveClass("juno-select-primary-danger")
  })
  
  test("does not render semantic classes when in error state as passed", async () => {
    render(<RSelect variant="primary-danger" error />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).not.toHaveClass("juno-select-primary-danger")
  })
  
  test("does not render semantic classes when validated as passed", async () => {
    render(<RSelect variant="primary-danger" valid />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).not.toHaveClass("juno-select-primary-danger")
  })
  
  test("does not render semantic classes when invalidated as passed", async () => {
    render(<RSelect variant="primary-danger" invalid />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).not.toHaveClass("juno-select-primary-danger")
  })
  
  test("renders an open Select as passed", async () => {
    render(<RSelect open onOpenChange={ () => {} }>
      <RSelectOption value="1"></RSelectOption>
    </RSelect>)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
  })
  
  test("renders a placeholder as passed", async () => {
    render(<RSelect placeholder="my-placeholder" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveTextContent("my-placeholder")
  })
  
  test("sets a value for a controlled Select as passed", async () => {
    render(
      <RSelect value="2">
        <RSelectOption value="1">Option 1</RSelectOption>
        <RSelectOption value="2">Option 2</RSelectOption>
        <RSelectOption value="3">Option 3</RSelectOption>
      </RSelect>
    )
    expect(screen.getByRole("combobox")).not.toHaveTextContent("Option 1")
    expect(screen.getByRole("combobox")).toHaveTextContent("Option 2")
    expect(screen.getByRole("combobox")).not.toHaveTextContent("Option 3")    
  })
  
  test("sets a defaultValue for an uncontrolled Select as passed", async () => {
    render(
      <RSelect defaultValue="2">
        <RSelectOption value="1">Option 1</RSelectOption>
        <RSelectOption value="2">Option 2</RSelectOption>
        <RSelectOption value="3">Option 3</RSelectOption>
      </RSelect>
    )
    expect(screen.getByRole("combobox")).not.toHaveTextContent("Option 1")
    expect(screen.getByRole("combobox")).toHaveTextContent("Option 2")
    expect(screen.getByRole("combobox")).not.toHaveTextContent("Option 3")    
  })
  
  test("renders a helptext as passed", async () => {
    render(<RSelect helptext="this is a helptext"/>)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-help")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("this is a helptext")
  })
  
  test("renders a successtext as passed and validates the Element", async () => {
    render(<RSelect successtext="great success!" />)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-success")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("great success!")
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-valid")
  })
  
  test("renders an errortext as passed and invalidates the Element", async () => {
    render(<RSelect errortext="this is an error!" />)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-error")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("this is an error!")
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-invalid")
  })
  
  test("renders non-truncated Select Options by default", async () => {
    render(
      <RSelect open>
        <RSelectOption value="1">Option 1</RSelectOption>
      </RSelect>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).not.toHaveClass("juno-select-option-truncate")
  })
  
  test("renders truncated Select Options as passed", async () => {
    render(
      <RSelect truncateOptions open>
        <RSelectOption value="1">Option 1</RSelectOption>
      </RSelect>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveClass("juno-select-option-truncate")
  })
  
  test("allows user to open a Select by clicking on it", async () => {
    render(
      <RSelect onOpenChange={mockOnOpenChange}>
        <RSelectOption value="1">Option 1</RSelectOption>
        <RSelectOption value="2">Option 2</RSelectOption>
        <RSelectOption value="3">Option 3</RSelectOption>
      </RSelect>
    )
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole("combobox"))
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    expect(mockOnOpenChange).toHaveBeenCalled()
  })
  
  test("allows user to change a value on an uncontrolled Select", async () => {
    render(
      <RSelect defaultValue="val-1" onValueChange={mockOnValueChange}>
        <RSelectOption value="val-1">Option 1</RSelectOption>
        <RSelectOption value="val-2">Option 2</RSelectOption>
        <RSelectOption value="val-3">Option 3</RSelectOption>
      </RSelect>
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
        <RSelectOption value="val-1">Option 1</RSelectOption>
        <RSelectOption value="val-2">Option 2</RSelectOption>
        <RSelectOption value="val-3">Option 3</RSelectOption>
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
        <RSelectOption value="val-1">Option 1</RSelectOption>
        <RSelectOption value="val-2">Option 2</RSelectOption>
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
      <RSelect className="my-select-class">
        <RSelectOption value="1">Option 1</RSelectOption>
        <RSelectOption value="2">Option 2</RSelectOption>
        <RSelectOption value="3">Option 3</RSelectOption>
      </RSelect>
    )
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("my-select-class")
  })
  
  test("renders all props as passed", async () => {
    render(
      <RSelect data-lolol="123">
        <RSelectOption value="1">Option 1</RSelectOption>
        <RSelectOption value="2">Option 2</RSelectOption>
        <RSelectOption value="3">Option 3</RSelectOption>
      </RSelect>
    )
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute("data-lolol", "123")
  })
  
})