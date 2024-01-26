import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Datepicker } from "./index"


describe("Datepicker", () => {
  
  test("renders a Datepicker", async () => {
    render(<Datepicker />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text")
    expect(screen.getByRole("textbox")).toHaveClass("juno-datepicker-input")
  })
  
  test("renders a label as passed", async () => {
    render(<Datepicker label="The Datepicker Label" id="my-textinput"/>)
    expect(document.querySelector(".juno-label")).toBeInTheDocument()
    expect(document.querySelector(".juno-label")).toHaveTextContent("The Datepicker Label")
  })
  
  test("renders an id as passed", async () => {
    render(<Datepicker id="my-datepicker" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute('id', "my-datepicker")
  })
  
  test("renders a datepicker with an auto-generated id if no id is passed", async () => {
    render(<Datepicker />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("id")
    expect(screen.getByRole("textbox").getAttribute("id")).toMatch("juno-datepicker")
  })
  
  test("renders a datepicker with a label associated by an id as passed", async () => {
    render(<Datepicker label="The Datepicker Label" id="dp-1"/>)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("id")
    expect(screen.getByRole("textbox").getAttribute("id")).toMatch("dp-1")
    expect(screen.getByLabelText("The Datepicker Label")).toBeInTheDocument()
  })
  
  test("renders a datepicker with a label associated by an auto-generated id if no id was passed ", async () => {
    render(<Datepicker label="This is a Datepicker" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByLabelText("This is a Datepicker")).toBeInTheDocument()
  })
  
  test("renders a datepicker with a placholder as passed", async () => {
    render(<Datepicker placeholder="This is a placeholder" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "This is a placeholder")
  })
  
  test("renders a disabled datepicker as passed", async () => {
    render(<Datepicker disabled />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toBeDisabled()
  })
  
  test("renders a Clear button if passed and when a date is set", async () => {
    render(<Datepicker clear value="2027-01-12" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByTitle("Clear")).toBeInTheDocument()
  })
  
  test("renders a Datepicker marked as required", async () => {
    // Datepicker needs a label passed since the Label subcomponent is responsible for rendering the Required marker:
    render(<Datepicker label="Required Datepicker" required />)
    expect(document.querySelector(".juno-required")).toBeInTheDocument()
  })
  
  test("renders a helptext as passed", async () => {
    render(<Datepicker helptext="this is a helptext"/>)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-help")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("this is a helptext")
  })
  
  test("renders a valid datepicker as passed", async () => {
    render(<Datepicker valid />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveClass("juno-datepicker-input-valid")
    expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
  })
  
  test("renders an invalid datepicker as passed", async () => {
    render(<Datepicker invalid />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveClass("juno-datepicker-input-invalid")
    expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
  })
  
  test("renders a successtext as passed and validates the element", async () => {
    render(<Datepicker successtext="great success!" />)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-success")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("great success!")
    expect(screen.getByRole("textbox")).toHaveClass("juno-datepicker-input-valid")
    expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
  })
  
  test("renders an errortext as passed and invalidates the element", async () => {
    render(<Datepicker errortext="this is an error!" />)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-error")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("this is an error!")
    expect(screen.getByRole("textbox")).toHaveClass("juno-datepicker-input-invalid")
    expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
  })
  
  test("renders a Datepicker with a time picker as passed", async () => {
    render(<Datepicker enableTime={true} dateFormat="Y-m-d H:i:S"/>)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(document.querySelector(".flatpickr-time")).toBeInTheDocument()
    expect(screen.getByLabelText("Hour")).toBeInTheDocument()
    expect(screen.getByLabelText("Minute")).toBeInTheDocument()
  })
  
  test("renders a Datepicker with a time picker with seconds as passed", async () => {
    render(<Datepicker enableTime={true} enableSeconds={true} dateFormat="Y-m-d H:i:S"/>)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(document.querySelector(".flatpickr-time")).toBeInTheDocument()
    expect(screen.getByLabelText("Hour")).toBeInTheDocument()
    expect(screen.getByLabelText("Minute")).toBeInTheDocument()
    // We need to check for the flatpickr className as flatpickr does not assign an aria-label to teh seconds input:
    expect(document.querySelector(".flatpickr-second")).toBeInTheDocument()
  })
  
  test("displays the date as passed as a date object", async () => {
    render(<Datepicker value={ new Date(2099, 0, 1) }/>)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("2099-01-01")
  })
  
  test("displays the date as passed as a date string", async () => {
    render(<Datepicker value="2024-01-26" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("2024-01-26")
  })
  
  test("diplays the date as passed as an ISO date string", async () => {
    render(<Datepicker value="2034-02-26T19:40:03.243Z" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("2034-02-26")
  })
  
  test("displays the date as passed as a timestamp", async () => {
    render(<Datepicker value={1706273787000} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("2024-01-26")
  })
  
  test("displays the date as passed by shortcut 'today'", async () => {
    render(<Datepicker value="today" />)
    const todaysDate = new Date()
    const todaysDateAsString = todaysDate.getFullYear() + "-" + todaysDate.getMonth() + 1 + "-" + todaysDate.getDate()
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue(todaysDateAsString)
  })
  
  test("displays the date in a custom format as passed", async () => {
    render(<Datepicker dateFormat="F d Y" value={1706273787000} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("January 26 2024")
  })
  
  test("renders a className as passed", async () => {
    render(<Datepicker className="my-custom-class" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveClass("my-custom-class")
  })
  
  test("renders other props as passed", async () => {
    render(<Datepicker data-lolol="527" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute('data-lolol', "527")
  })
  
})