import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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
    // We need to check for the flatpickr className as flatpickr does not assign an aria-label to the seconds input:
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
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, "0")
    const day = today.getDate().toString().padStart(2, "0")
    const todayAsString = `${year}-${month}-${day}`
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue(todayAsString)
  })
  
  test("displays the date in a custom format as passed", async () => {
    render(<Datepicker dateFormat="F d Y" value={1706273787000} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("January 26 2024")
  })
  
  test("allows typing in the field when configured to do so", async () => {
    render(<Datepicker allowInput />)
    const input = screen.getByRole("textbox")
    const user = userEvent.setup()
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue("")
    await userEvent.click(input)
    await user.type(input, "12")
    expect(input).toHaveValue("12")
  })
  
  test("renders a Datepicker in single mode per default", async () => {
    render(<Datepicker />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("data-mode", "single")
  })
  
  test("renders a Datepicker in multiple mode as passed", async () => {
    render(<Datepicker mode="multiple" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("data-mode", "multiple")
  })
  
  test("renders a Datepicker in range mode as passed", async () => {
    render(<Datepicker mode="range" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("data-mode", "range")
  })
  
  test("allows setting an otherwise invalid value on first load as configured ", async () => {
    render(<Datepicker value="2024-01-30" disable={[ "2024-01-30" ]} allowInvalidPreload />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("2024-01-30")
  })
  
  test("clears the input when clicking the clear button", async () => {
    render(<Datepicker value="2024-01-31" clear />)
    const input = screen.getByRole("textbox")
    const clearButton = screen.getByTitle("Clear")
    const user = userEvent.setup()
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue("2024-01-31")
    expect(clearButton).toBeInTheDocument()
    await user.click(clearButton)
    expect(input).toHaveValue("")
  })
  
  test("sets a custom aria-label format for calendar dates as passed", async () => {
    render(<Datepicker ariaDateFormat="l, F j, Y"/>)
    const input = screen.getByRole("textbox")
    const user = userEvent.setup()
    expect(input).toBeInTheDocument()
    // click to open the calendar:
    await user.click(input)
    //Match something like "Monday, January 31, 2024" to pattern like [word, comma, space, word, space, one or two-digit number, comma, space, four-digit number] assuming this is precise enough:
    expect(document.querySelectorAll(".flatpickr-day")[0].getAttribute("aria-label")).toMatch( new RegExp(/^\b\w+\b, \b\w+\b \d{1,2}, \d{4}$/) )
  })
  
  test("uses a custom conjunction between dates in multiple mode as passed", async () => {
    render(<Datepicker mode="multiple" conjunction=" || " value={["2024-02-01", "2099-03-12"]}/>)
    const input = screen.getByRole("textbox")
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue("2024-02-01 || 2099-03-12")
  })
  
  test("sets a default hour as passed", async () => {
    render(<Datepicker enableTime={true} dateFormat="Y-m-d H:i" defaultHour={5}/>)
    const input = screen.getByRole("textbox")
    const user = userEvent.setup()
    expect(input).toBeInTheDocument()
    await user.click(input)
    // const hourInput = screen.getByRole("textbox", {name: "Hour"})
    // const hourInput = screen.getByRole("textbox", {selector: "input.flatpickr-hour"})
    const hourInput = document.querySelector("input.flatpickr-hour")
    expect(hourInput).toHaveValue(5)
  })
  
  test("sets a default minute as passed", async () => {
    render(<Datepicker enableTime dateFormat="Y-m-d H:i" defaultMinute={13} />)
    const input = screen.getByRole("textbox")
    const user = userEvent.setup()
    expect(input).toBeInTheDocument()
    await user.click(input)
    const minuteInput = document.querySelector("input.flatpickr-minute")
    expect(minuteInput).toHaveValue(13)
  })
  
  test("opens a calendar when clicking in the datepicker field", async () => {
    render(<Datepicker />)
    const input = screen.getByRole("textbox")
    const calendar = document.querySelector(".flatpickr-calendar")
    const user = userEvent.setup()
    expect(input).toBeInTheDocument()
    expect(calendar).toBeInTheDocument()
    expect(calendar).not.toHaveClass("open") 
    await user.click(input)
    expect(calendar).toHaveClass("open")
  })
  
  test("uses a custom hour increment as passed", async () => {
    render(<Datepicker enableTime dateFormat="Y-m-d H:i" hourIncrement={6} />)
    const hourInput = document.querySelector("input.flatpickr-hour")
    expect(hourInput).toHaveAttribute("step", "6")
  })
  
  test("uses a custom minute increment as passed", async () => {
    render(<Datepicker enableTime dateFormat="Y-m-d H:i" minuteIncrement={7} />)
    const hourInput = document.querySelector("input.flatpickr-minute")
    expect(hourInput).toHaveAttribute("step", "7")
  })
  
  test("renders an inline calender as passed", async () => {
    render(<Datepicker inline />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(document.querySelector(".flatpickr-calendar.inline")).toBeInTheDocument()
  })
  
  test.skip("accepts and respects a custom locale as passed", async () => {
    
  })
  
  test.skip("allows only selection of dates after a minDate as passed", async () => {
    
  })
  
  test.skip("allows only selection of dates before a maxDate as passed", async () => {
    
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