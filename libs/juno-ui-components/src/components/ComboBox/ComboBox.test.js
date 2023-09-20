import * as React from "react"
import { cleanup, render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"
import { ComboBox } from "./index"
import { ComboBoxOption } from "../ComboBoxOption/index"

const mockOnBlur = jest.fn()
const mockOnChange = jest.fn()
const mockOnFocus = jest.fn()
const mockOnInputChange = jest.fn()

describe("ComboBox", () => {
  
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })
  
  test("renders a ComboBox", async () => {
    act(() => {
      render(<ComboBox />)
    })
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute('type', "text")
    expect(screen.getByRole("combobox")).toHaveClass("juno-combobox-input")
  })
  
  // Skipping for now, in the browser the hidden input field is rendered whan passing a 'name' prop, however in the test it is not found?
  test.skip("renders a ComboBox with a name as passed", async () => {
    act(() => {
      render(
        <ComboBox name="my-wonderful-combobox">
          <ComboBoxOption value="Option 1">Option 1</ComboBoxOption>
        </ComboBox>
      )
    })
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    /* Here we need to direclty select the input, since headless 
      a) does not add the name to the visible input element but to another, hidden input element it keeps in sync, and
      b) react-testing fails when trying to access hidden elements by role: */
    expect(document.querySelector("input[name='my-wonderful-combobox']")).toBeInTheDocument()
  })
  
  test("renders a ComboBox with a label as passed", async () => {
    act(() => {
      render(<ComboBox label="My Label"/>)
    })
    expect(document.querySelector(".juno-label")).toBeInTheDocument()
    expect(document.querySelector(".juno-label")).toHaveTextContent("My Label")
  })
  
  test("renders options as passed", async () => {
    act(() => {
        render(
        <ComboBox>
          <ComboBoxOption value="Option 1">Option 1</ComboBoxOption>
        </ComboBox>
      )
    })
    const cbox = screen.getByRole("combobox")
    const cbutton = screen.getByRole("button")
    expect(cbox).toBeInTheDocument()
    expect(cbutton).toBeInTheDocument()
    await userEvent.click(cbutton)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    expect(screen.getByRole("option")).toBeInTheDocument()
    expect(screen.getByRole("option")).toHaveTextContent("Option 1")
  })
  
  test("renders an id as passed", async () => {
    act(() => {
      render(<ComboBox id="My Id"/>)
    })
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute('id', "My Id")
  })
  
  test("renders the id of the ComboBox input as the for attribute of the label", async () => {
    act(() => {
      render(<ComboBox label="the label"/>)
    })
    const cbox = screen.getByRole("combobox")
    const label = document.querySelector(".juno-label")
    expect(cbox).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(label.getAttribute("for")).toMatch(cbox.getAttribute("id"))
    expect(screen.getByLabelText("the label")).toBeInTheDocument()
  })
  
  test("renders an aria-label as passed", async () => {
    act(() => {
      render(<ComboBox ariaLabel="my aria-label" />)
    })
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute('aria-label', "my aria-label")
  })
  
  test("renders the label as an aria-label if no aria-label was passed", async () => {
    act(() => {
      render(<ComboBox label="My Label" />)
    })
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute('aria-label', "My Label")
  })
    
  test("renders a ComboBox with a placeholder as passed", async () => {
    act(() => {
      render(<ComboBox placeholder="My Placeholder"/>)
    })
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute('placeholder', "My Placeholder")
  })
  
  test("renders a disabled ComboBox as passed", async () => {
    act(() => {
      render(<ComboBox disabled />)
    })
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toBeDisabled()
  })
  
  test("renders a required ComboBox as passed", async () => {
    act(() => {
      render(<ComboBox label="My Required ComboBox" required />)
    })
    expect(document.querySelector(".juno-label")).toBeInTheDocument()
    expect(document.querySelector('.juno-required')).toBeInTheDocument()
  })
  
  test("renders a validated ComboBox as passed", async () => {
    act(() => {
      render(<ComboBox valid />)
    })
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-combobox-valid")
    expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
  })
  
  test("renders a validated ComboBox when a successtext was passed", async () => {
    act(() => {
      render(<ComboBox successtext="Great Success!" />)
    })
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-combobox-valid")
    expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
  })
  
  test("renders an invalidated ComboBox as passed", async () => {
    act(() => {
      render(<ComboBox invalid />)
    })
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-combobox-invalid")
    expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
  })
  
  test("renders an invalidated ComboBox when an errortext was passed", async () => {
    act(() => {
      render(<ComboBox errortext="Oh Snap!" />)
    })
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-combobox-invalid")
    expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
  })
  
  test("renders a helptext as passed", async () => {
    act(() => {
      render(<ComboBox helptext="A helptext goes here"/>)
    })
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-help")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("A helptext goes here")
  })
  
  test("renders an errortext as passed", async () => {
    act(() => {
      render(<ComboBox errortext="An errortext goes here"/>)
    })
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-error")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("An errortext goes here")
  })
  
  test("renders a successtext as passed", async () => {
    act(() => {
      render(<ComboBox successtext="A successtext goes here"/>)
    })
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-success")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("A successtext goes here")
  })
  
  test("renders a loading ComboBox with a Spinner as passed", async () => {
    act(() => {
      render(<ComboBox loading />)
    })
    expect(screen.getByRole("combobox")).toHaveClass("juno-combobox-loading")
    expect(document.querySelector(".juno-spinner")).toBeInTheDocument()
  })
  
  test("renders a ComboBox in error state with an Error icon as passed", async () => {
    act(() => {
      render(<ComboBox error />)
    })
    expect(screen.getByRole("combobox")).toHaveClass("juno-combobox-error")
    expect(screen.getByTitle("Error")).toBeInTheDocument()
  })
  
  test("fires an onBlur handler as passed when the ComboBox looses focus", async () => {
    act(() => {
      render(<ComboBox onBlur={mockOnBlur} />)
    })
    const user = userEvent.setup()
    const cbox = screen.getByRole("combobox")
    await user.click(cbox) // focus the element
    await user.tab() // blur the element
    expect(mockOnBlur).toHaveBeenCalled()
  })
  
  test("fires an onChange handler as passed when the user selects an option", async () => {
    act(() => {
      render(
        <ComboBox onChange={mockOnChange}>
          <ComboBoxOption value="option 1" name="option 1">Option 1</ComboBoxOption>
          <ComboBoxOption value="option 2" name="option 2">Option 2</ComboBoxOption>
        </ComboBox>
      )
    })
    const cbox = screen.getByRole("combobox")
    const cbutton = screen.getByRole("button")
    expect(cbox).toBeInTheDocument()
    expect(cbutton).toBeInTheDocument()
    await userEvent.click(cbutton)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("option", { name: "option 2" }))
    expect(mockOnChange).toHaveBeenCalled()
  })
  
  test("fires an onFocus handler as passed when the ComboBox receives focus", async () => {
    act(() => {
      render(<ComboBox onFocus={mockOnFocus} />)
    })
    const cbox = screen.getByRole("combobox")
    await userEvent.click(cbox)
    expect(mockOnFocus).toHaveBeenCalled()
  })
  
  test("fires an onInputChange handler when the user types into the ComboBox", async () => {
    act(() => {
      render(
        <ComboBox onInputChange={mockOnInputChange}>
          <ComboBoxOption value="something">Something</ComboBoxOption>
          <ComboBoxOption value="something else">Something else</ComboBoxOption>
        </ComboBox>
      )
    })
    const user = userEvent.setup()
    const cbox = screen.getByRole("combobox")
    await user.type(cbox, "a")
    expect(mockOnInputChange).toHaveBeenCalled()
  })
  
  test("filters options as the user types", async () => {
    act(() => {
      render(
        <ComboBox>
          <ComboBoxOption value="aaa" name="aaa">aaa</ComboBoxOption>
          <ComboBoxOption value="aab" name="aab">aab</ComboBoxOption>
          <ComboBoxOption value="abc" name="abc">abc</ComboBoxOption>
          <ComboBoxOption value="123" name="123">123</ComboBoxOption>
        </ComboBox>
      )
    })
    const user = userEvent.setup()
    const cbox = screen.getByRole("combobox")
    expect(cbox).toBeInTheDocument()
    await user.type(cbox, "a")
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "aaa" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "aab" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "abc" })).toBeInTheDocument()
    expect(screen.queryByRole("option", { name: "123" })).not.toBeInTheDocument()
    await user.type(cbox, "b")
    expect(screen.queryByRole("option", { name: "aaa" })).not.toBeInTheDocument()
    expect(screen.getByRole("option", { name: "aab" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "abc" })).toBeInTheDocument()
    expect(screen.queryByRole("option", { name: "123" })).not.toBeInTheDocument()
    await userEvent.clear(cbox)
    expect(screen.getByRole("option", { name: "aaa" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "aab" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "abc" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "123" })).toBeInTheDocument()
    await user.type(cbox, "1")
    expect(screen.queryByRole("option", { name: "aaa" })).not.toBeInTheDocument()
    expect(screen.queryByRole("option", { name: "aab" })).not.toBeInTheDocument()
    expect(screen.queryByRole("option", { name: "abc" })).not.toBeInTheDocument()
    expect(screen.getByRole("option", { name: "123" })).toBeInTheDocument()
  })
  
  test("selects an option when the user clicks it and closes the menu", async () => {
    act(() => {
      render(
        <ComboBox>
          <ComboBoxOption value="aaa" name="aaa">aaa</ComboBoxOption>
          <ComboBoxOption value="aab" name="aab">aab</ComboBoxOption>
          <ComboBoxOption value="abc" name="abc">abc</ComboBoxOption>
          <ComboBoxOption value="123" name="123">123</ComboBoxOption>
        </ComboBox>
      )
    })
    const cbox = screen.getByRole("combobox")
    const cbutton = screen.getByRole("button")
    expect(cbox).toBeInTheDocument()
    expect(cbutton).toBeInTheDocument()
    await userEvent.click(cbutton)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("option", { name: "abc" }))
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    expect(cbox).toHaveValue("abc")
  })
  
  test("renders a ComboBox with a selected value as passed", async () => {
    act(() => {
      render(
        <ComboBox value="aab">
          <ComboBoxOption value="aaa" name="aaa">aaa</ComboBoxOption>
          <ComboBoxOption value="aab" name="aab">aab</ComboBoxOption>
          <ComboBoxOption value="abc" name="abc">abc</ComboBoxOption>
          <ComboBoxOption value="123" name="123">123</ComboBoxOption>
        </ComboBox>
      )
    })
    const cbox = screen.getByRole("combobox")
    expect(cbox).toBeInTheDocument()
    expect(cbox).toHaveValue("aab")
  })
  
  test("works as an uncontrolled component", async () => {
    act(() => {
      render(
        <ComboBox defaultValue="abc">
          <ComboBoxOption>aaa</ComboBoxOption>
          <ComboBoxOption>aab</ComboBoxOption>
          <ComboBoxOption>abc</ComboBoxOption>
          <ComboBoxOption>123</ComboBoxOption>
        </ComboBox>
      )
    })
    const cbox = screen.getByRole("combobox")
    expect(cbox).toBeInTheDocument()
    expect(cbox).toHaveValue("abc")
  })
  
  test("renders a ComboBox with a custom className as passed", async () => {
    act(() => {
      render(<ComboBox className="my-combobox" />)
    })
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("my-combobox")
  })
  
  // Skipping because if we pass generic props to the ComboBox component it will be passed to the abstract headless Combobox component, but will not end up in the DOM:
  test.skip("renders all props as passed", async () => {
    act(() => {
      render(<ComboBox data-lolo="1234" />)
    })
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute("data-lolo", "1234")
  })
  
  
})