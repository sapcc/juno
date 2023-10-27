import * as React from "react"
import { cleanup, render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from 'react-dom/test-utils'
import { Select } from "./index"
import { SelectOption } from "../SelectOption/index"

const mockOnChange = jest.fn()
const mockOnValueChange = jest.fn()

const ControlledSelectParent = ({
  value,
  children,
  onChange,
  ...props
}) => {
  const [val, setVal] = React.useState(value)
  
  const handleChange = (v) => {
    setVal(v)
    onChange()
  }
  
  return (
    <Select value={val} onChange={handleChange} {...props}>
      { children }
    </Select>
    
  )
}

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
  
  test("renders default placeholder if empty string or undefined were passed as value", async () => {
    render(<Select value="" />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveTextContent("Select…")
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
  
  test("renders a custom className to the Select toggle as passed", async () => {
    render(<Select className="my-class" />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass("my-class")
  })
  
  test("renders a disabled Select as passed", async () => {
    render(<Select disabled />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeDisabled()
  })
  
  test("renders a valid Select as passed", async () => {
    render(<Select valid />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass("juno-select-valid")
    expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
  })
  
  test("renders an invalid Select as passed", async () => {
    render(<Select invalid />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass("juno-select-invalid")
    expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
  })
  
  test("renders a successtext as passed and validates the Element", async () => {
    render(<Select successtext="great success!" />)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-success")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("great success!")
    expect(screen.getByRole("button")).toHaveClass("juno-select-valid")
    expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
  })
  
  test("renders an errortext as passed and invalidates the Element", async () => {
    render(<Select errortext="this is an error!" />)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-error")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("this is an error!")
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
  
  test("renders non-truncated Select Options by default", async () => {
    render(
      <Select>
        <SelectOption value="1">Option 1</SelectOption>
      </Select>
    )
    const toggle = screen.getByRole("button")
    expect(toggle).toBeInTheDocument()
    await userEvent.click(toggle)
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).not.toHaveClass("juno-select-option-truncate")
  })
  
  test("renders truncated Select Options as passed", async () => {
    render(
      <Select truncateOptions>
        <SelectOption value="1">Option 1</SelectOption>
      </Select>
    )
    const toggle = screen.getByRole("button")
    expect(toggle).toBeInTheDocument()
    await userEvent.click(toggle)
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveClass("juno-select-option-truncate")
  })
  
  test("renders a Select with a value selected as passed", async () => {
    render(
      <Select value="Option 2">
        <SelectOption value="Option 1" />
        <SelectOption value="Option 2" />
        <SelectOption value="Option 3" />
      </Select>
    )
    const toggle = screen.getByRole("button")
    expect(toggle).toBeInTheDocument()
    expect(toggle).toHaveTextContent("Option 2")
    await userEvent.click(toggle)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    expect(screen.getAllByRole("option")[1]).toHaveTextContent("Option 2")
    expect(screen.getAllByRole("option")[1]).toHaveAttribute("aria-selected", "true")
  })
  
  test("opens the Select menu with options as passed when the user clicks the Select toggle", async () => {
    render(
      <Select>
        <SelectOption value="Option 1" />
        <SelectOption value="Option 2" />
        <SelectOption value="Option 3" />
      </Select>
    )
   const toggle = screen.getByRole("button")
   expect(toggle).toBeInTheDocument()
   await userEvent.click(toggle)
   expect(screen.getByRole("listbox")).toBeInTheDocument()
   expect(screen.queryAllByRole("option")).toHaveLength(3)
   expect(screen.getAllByRole("option")[0]).toHaveTextContent("Option 1")
   expect(screen.getAllByRole("option")[1]).toHaveTextContent("Option 2")
   expect(screen.getAllByRole("option")[2]).toHaveTextContent("Option 3")
  })
  
  test("changes the selected value as clicked by a user", async () => {
    render(
        <Select>
          <SelectOption value="Option 1" />
          <SelectOption value="Option 2" />
          <SelectOption value="Option 3" />
        </Select>
      )
     const toggle = screen.getByRole("button")
     expect(toggle).toBeInTheDocument()
     expect(toggle).toHaveTextContent("Select…")
     await userEvent.click(toggle)
     expect(screen.getByRole("listbox")).toBeInTheDocument()
     const option2 = screen.getAllByRole("option")[1]
     await userEvent.click(option2)
     expect(toggle).toHaveTextContent("Option 2")
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
  
  test("executes a legacy onValueChange handler when the Select value changes", async () => {
    render(
      <Select onValueChange={mockOnValueChange} >
        <SelectOption value="Option-1">Option 1</SelectOption>
      </Select>
    )
    const toggle = screen.getByRole("button")
    expect(toggle).toBeInTheDocument()
    await userEvent.click(toggle)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("option"))
    expect(mockOnValueChange).toHaveBeenCalled()
  })
  
  test("works as a controlled component", async () => {
    render(
      <ControlledSelectParent value="Option 1" onChange={mockOnChange} >
        <SelectOption value="Option 1">Option 1</SelectOption>
        <SelectOption value="Option 2">Option 2</SelectOption>
        <SelectOption value="Option 3">Option 3</SelectOption>
      </ControlledSelectParent>
    )
    const toggle = screen.getByRole("button")
    expect(toggle).toBeInTheDocument()
    expect(toggle).toHaveTextContent("Option 1")
    await userEvent.click(toggle)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    const option2 = screen.getAllByRole("option")[1]
    await userEvent.click(option2)
    expect(toggle).toHaveTextContent("Option 2")
  })
  
  test("works as an uncontrolled component", async () => {
    render(
      <Select defaultValue="Option 2">
        <SelectOption value="Option 1">Option 1</SelectOption>
        <SelectOption value="Option 2">Option 2</SelectOption>
        <SelectOption value="Option 3">Option 3</SelectOption>
      </Select>
    )
    const toggle = screen.getByRole("button")
    expect(toggle).toBeInTheDocument()
    expect(toggle).toHaveTextContent("Option 2")
    await userEvent.click(toggle)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    const option3 = screen.getAllByRole("option")[2]
    await userEvent.click(option3)
    expect(toggle).toHaveTextContent("Option 3")
  })
  
  test("works when options are not passed a value prop but only children", async () => {
    render(
      <Select>
        <SelectOption>Option 1</SelectOption>
        <SelectOption>Option 2</SelectOption>
        <SelectOption>Option 3</SelectOption>
        <SelectOption>Option 4</SelectOption>
        <SelectOption>Option 5</SelectOption>
      </Select>
    )
    const toggle = screen.getByRole("button")
    expect(toggle).toBeInTheDocument()
    expect(toggle).toHaveTextContent("Select…")
    await userEvent.click(toggle)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    const option3 = screen.getAllByRole("option")[2]
    await userEvent.click(option3)
    expect(toggle).toHaveTextContent("Option 3")
    await userEvent.click(toggle)
    const option1 = screen.getAllByRole("option")[0]
    await userEvent.click(option1)
    expect(toggle).toHaveTextContent("Option 1")
  })

  test("shows a warning in the console when one of the children is undefined or not a SelectOption", async () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    render(
      <Select>
        <SelectOption>Option 1</SelectOption>
        <SelectOption>Option 2</SelectOption>
        <SelectOption>Option 3</SelectOption>
        <SelectOption>Option 4</SelectOption>
        <SelectOption>Option 5</SelectOption>
        <div>Option 6</div>
        {undefined}
      </Select>
    )
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenCalledWith("Select: at least one of the options is undefined or null or not of type SelectOption")
    spy.mockRestore()
  })
  
})