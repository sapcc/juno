import * as React from "react"
import { cleanup, render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { DateTimePicker } from "./index"

const mockOnOpen = jest.fn()
const mockOnClose = jest.fn()
const mockOnChange = jest.fn()
const mockOnMonthChange = jest.fn()
const mockOnYearChange = jest.fn()
const mockOnValueUpdate = jest.fn()

describe("DateTimePicker", () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  test("renders a DateTimePicker", async () => {
    render(<DateTimePicker />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text")
    expect(screen.getByRole("textbox")).toHaveClass("juno-datetimepicker-input")
  })

  test("renders a calendar icon", async () => {
    render(<DateTimePicker />)
    expect(screen.getByTitle("Calendar")).toBeInTheDocument()
  })

  // test("renders a label as passed", async () => {
  //   render(<DateTimePicker label="The DateTimePicker Label" id="my-textinput"/>)
  //   expect(document.querySelector(".juno-label")).toBeInTheDocument()
  //   expect(document.querySelector(".juno-label")).toHaveTextContent("The DateTimePicker Label")
  // })
  //
  test("renders an id as passed", async () => {
    render(<DateTimePicker id="my-datetimepicker" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "id",
      "my-datetimepicker"
    )
  })

  test("renders a name as passed", async () => {
    render(<DateTimePicker name="my-name" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("name", "my-name")
  })

  test("renders a DateTimePicker with an auto-generated id if no id is passed", async () => {
    render(<DateTimePicker />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("id")
    expect(screen.getByRole("textbox").getAttribute("id")).toMatch(
      "juno-datetimepicker"
    )
  })

  // test("renders a DateTimePicker with a label associated by an id as passed", async () => {
  //   render(<DateTimePicker label="The DateTimePicker Label" id="dp-1"/>)
  //   expect(screen.getByRole("textbox")).toBeInTheDocument()
  //   expect(screen.getByRole("textbox")).toHaveAttribute("id")
  //   expect(screen.getByRole("textbox").getAttribute("id")).toMatch("dp-1")
  //   expect(screen.getByLabelText("The DateTimePicker Label")).toBeInTheDocument()
  // })
  //
  // test("renders a DateTimePicker with a label associated by an auto-generated id if no id was passed ", async () => {
  //   render(<DateTimePicker label="This is a DateTimePicker" />)
  //   expect(screen.getByRole("textbox")).toBeInTheDocument()
  //   expect(screen.getByLabelText("This is a DateTimePicker")).toBeInTheDocument()
  // })

  test("renders a DateTimePicker with a placholder as passed", async () => {
    render(<DateTimePicker placeholder="This is a placeholder" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "This is a placeholder"
    )
  })

  test("renders a disabled DateTimePicker as passed", async () => {
    render(<DateTimePicker disabled />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toBeDisabled()
  })

  test("renders a Clear button if passed and when a date is set", async () => {
    render(<DateTimePicker value="2027-01-12" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByTitle("Clear")).toBeInTheDocument()
  })

  // test("renders a DateTimePicker marked as required", async () => {
  //   // DateTimePicker needs a label passed since the Label subcomponent is responsible for rendering the Required marker:
  //   render(<DateTimePicker label="Required DateTimePicker" required />)
  //   expect(document.querySelector(".juno-required")).toBeInTheDocument()
  // })

  // test("renders a helptext as passed", async () => {
  //   render(<DateTimePicker helptext="this is a helptext"/>)
  //   expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
  //   expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-help")
  //   expect(document.querySelector(".juno-form-hint")).toHaveTextContent("this is a helptext")
  // })
  //
  // test("renders a valid DateTimePicker as passed", async () => {
  //   render(<DateTimePicker valid />)
  //   expect(screen.getByRole("textbox")).toBeInTheDocument()
  //   expect(screen.getByRole("textbox")).toHaveClass("juno-datetimepicker-input-valid")
  //   expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
  // })
  //
  // test("renders an invalid DateTimePicker as passed", async () => {
  //   render(<DateTimePicker invalid />)
  //   expect(screen.getByRole("textbox")).toBeInTheDocument()
  //   expect(screen.getByRole("textbox")).toHaveClass("juno-datetimepicker-input-invalid")
  //   expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
  // })
  //
  // test("renders a successtext as passed and validates the element", async () => {
  //   render(<DateTimePicker successtext="great success!" />)
  //   expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
  //   expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-success")
  //   expect(document.querySelector(".juno-form-hint")).toHaveTextContent("great success!")
  //   expect(screen.getByRole("textbox")).toHaveClass("juno-DateTimePicker-input-valid")
  //   expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
  // })
  //
  // test("renders an errortext as passed and invalidates the element", async () => {
  //   render(<DateTimePicker errortext="this is an error!" />)
  //   expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
  //   expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-error")
  //   expect(document.querySelector(".juno-form-hint")).toHaveTextContent("this is an error!")
  //   expect(screen.getByRole("textbox")).toHaveClass("juno-datetimepicker-input-invalid")
  //   expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
  // })

  test("renders a DateTimePicker with a time picker as passed", async () => {
    render(<DateTimePicker enableTime={true} dateFormat="Y-m-d H:i:S" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(document.querySelector(".flatpickr-time")).toBeInTheDocument()
    expect(screen.getByLabelText("Hour")).toBeInTheDocument()
    expect(screen.getByLabelText("Minute")).toBeInTheDocument()
  })

  test("renders a DateTimePicker with a time picker with seconds as passed", async () => {
    render(
      <DateTimePicker
        enableTime={true}
        enableSeconds={true}
        dateFormat="Y-m-d H:i:S"
      />
    )
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(document.querySelector(".flatpickr-time")).toBeInTheDocument()
    expect(screen.getByLabelText("Hour")).toBeInTheDocument()
    expect(screen.getByLabelText("Minute")).toBeInTheDocument()
    // We need to check for the flatpickr className as flatpickr does not assign an aria-label to the seconds input:
    expect(document.querySelector(".flatpickr-second")).toBeInTheDocument()
  })

  // TODO: PASS AND UPDATE DATES IN VARIOUS FORMATS HERE:

  test("displays the date as passed as a date object", async () => {
    render(<DateTimePicker value={new Date(2099, 0, 1)} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("2099-01-01")
  })

  test("displays the date as passed as a date string", async () => {
    render(<DateTimePicker value="2024-01-26" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("2024-01-26")
  })

  test("diplays the date as passed as an ISO date string", async () => {
    render(<DateTimePicker value="2034-02-26T19:40:03.243Z" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("2034-02-26")
  })

  test("displays the date as passed as a timestamp", async () => {
    render(<DateTimePicker value={1706273787000} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("2024-01-26")
  })

  test("displays the date as passed by shortcut 'today'", async () => {
    render(<DateTimePicker value="today" />)
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, "0")
    const day = today.getDate().toString().padStart(2, "0")
    const todayAsString = `${year}-${month}-${day}`
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue(todayAsString)
  })

  test("displays the date in a custom format as passed", async () => {
    render(<DateTimePicker dateFormat="F d Y" value={1706273787000} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("January 26 2024")
  })

  test("displays the date as passed as defaultDate instead of value", async () => {
    render(<DateTimePicker defaultDate={new Date(2099, 0, 1)} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("2099-01-01")
  })

  test("displays the date as passed as defaultValue instead of value or defaultDate", async () => {
    render(<DateTimePicker defaultValue={new Date(2099, 0, 1)} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("2099-01-01")
  })

  test("updates the date accordingly when value changes", async () => {
    const { rerender } = render(
      <DateTimePicker value={new Date(2024, 0, 12)} />
    )
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("2024-01-12")
    rerender(<DateTimePicker value={new Date(2025, 7, 18)} />)
    expect(screen.getByRole("textbox")).toHaveValue("2025-08-18")
  })

  test("allows typing in the field when configured to do so", async () => {
    render(<DateTimePicker allowInput />)
    const input = screen.getByRole("textbox")
    const user = userEvent.setup()
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue("")
    await userEvent.click(input)
    await user.type(input, "12")
    expect(input).toHaveValue("12")
  })

  test("renders a DateTimePicker in single mode per default", async () => {
    render(<DateTimePicker />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("data-mode", "single")
  })

  test("renders a DateTimePicker in multiple mode as passed", async () => {
    render(<DateTimePicker mode="multiple" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("data-mode", "multiple")
  })

  test("renders a DateTimePicker in range mode as passed", async () => {
    render(<DateTimePicker mode="range" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("data-mode", "range")
  })

  test("allows setting an otherwise invalid value on first load as configured ", async () => {
    render(
      <DateTimePicker
        value="2024-01-30"
        disable={["2024-01-30"]}
        allowInvalidPreload
      />
    )
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("2024-01-30")
  })

  test("clicking the clear button clears the input", async () => {
    render(<DateTimePicker value="2024-01-31" clear />)
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
    render(<DateTimePicker ariaDateFormat="l, F j, Y" />)
    const input = screen.getByRole("textbox")
    const user = userEvent.setup()
    expect(input).toBeInTheDocument()
    // click to open the calendar:
    await user.click(input)
    //Match something like "Monday, January 31, 2024" to pattern like [word, comma, space, word, space, one or two-digit number, comma, space, four-digit number] assuming this is precise enough:
    expect(
      document.querySelectorAll(".flatpickr-day")[0].getAttribute("aria-label")
    ).toMatch(new RegExp(/^\b\w+\b, \b\w+\b \d{1,2}, \d{4}$/))
  })

  test("uses a custom conjunction between dates in multiple mode as passed", async () => {
    render(
      <DateTimePicker
        mode="multiple"
        conjunction=" || "
        value={["2024-02-01", "2099-03-12"]}
      />
    )
    const input = screen.getByRole("textbox")
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue("2024-02-01 || 2099-03-12")
  })

  test("sets a default hour as passed", async () => {
    render(
      <DateTimePicker
        enableTime={true}
        dateFormat="Y-m-d H:i"
        defaultHour={5}
      />
    )
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
    render(
      <DateTimePicker enableTime dateFormat="Y-m-d H:i" defaultMinute={13} />
    )
    const input = screen.getByRole("textbox")
    const user = userEvent.setup()
    expect(input).toBeInTheDocument()
    await user.click(input)
    const minuteInput = document.querySelector("input.flatpickr-minute")
    expect(minuteInput).toHaveValue(13)
  })

  test("opens a calendar when clicking in the datepicker field", async () => {
    render(<DateTimePicker />)
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
    render(
      <DateTimePicker enableTime dateFormat="Y-m-d H:i" hourIncrement={6} />
    )
    const hourInput = document.querySelector("input.flatpickr-hour")
    expect(hourInput).toHaveAttribute("step", "6")
  })

  test("uses a custom minute increment as passed", async () => {
    render(
      <DateTimePicker enableTime dateFormat="Y-m-d H:i" minuteIncrement={7} />
    )
    const hourInput = document.querySelector("input.flatpickr-minute")
    expect(hourInput).toHaveAttribute("step", "7")
  })

  test("does not allow selection of dates before a minDate as passed", async () => {
    // Select yesterday element in calendar by label (formed like "January 31, 2024"), and test if disabled.
    const user = userEvent.setup()
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const fullMonth = yesterday.toLocaleString("default", { month: "long" })
    const day = yesterday.getDate()
    const fullYear = yesterday.getFullYear()
    const yesterdayLabel = `${fullMonth} ${day}, ${fullYear}`
    render(<DateTimePicker minDate={today} />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    const yesterdayEl = screen.getByLabelText(yesterdayLabel)
    expect(yesterdayEl).toHaveClass("flatpickr-disabled")
  })

  test("allows selection of dates after a minDate as passed", async () => {
    const user = userEvent.setup()
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const fullMonth = tomorrow.toLocaleString("default", { month: "long" })
    const day = tomorrow.getDate()
    const fullYear = tomorrow.getFullYear()
    const tomorrowLabel = `${fullMonth} ${day}, ${fullYear}`
    render(<DateTimePicker minDate={today} />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    const yesterdayEl = screen.getByLabelText(tomorrowLabel)
    expect(yesterdayEl).not.toHaveClass("flatpickr-disabled")
  })

  test("does not allow selection of dates after a maxDate as passed", async () => {
    const user = userEvent.setup()
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowFullMonth = tomorrow.toLocaleString("default", {
      month: "long",
    })
    const tomorrowDay = tomorrow.getDate()
    const tomorrowFullYear = tomorrow.getFullYear()
    const tomorrowLabel = `${tomorrowFullMonth} ${tomorrowDay}, ${tomorrowFullYear}`
    render(<DateTimePicker maxDate={today} />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    const tomorrowEl = screen.getByLabelText(tomorrowLabel)
    expect(tomorrowEl).toHaveClass("flatpickr-disabled")
  })

  test("allows selection of dates before a maxDate as passed", async () => {
    const user = userEvent.setup()
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const todayFullMonth = today.toLocaleString("default", { month: "long" })
    const todayDay = today.getDate()
    const todayFullYear = today.getFullYear()
    const todayLabel = `${todayFullMonth} ${todayDay}, ${todayFullYear}`
    render(<DateTimePicker maxDate={tomorrow} />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    const todayEl = screen.getByLabelText(todayLabel)
    expect(todayEl).not.toHaveClass("flatpickr-disabled")
  })

  test("renders a time picker only if configured to do so", async () => {
    render(<DateTimePicker enableTime noCalendar />)
    expect(document.querySelector(".flatpickr-days")).not.toBeInTheDocument()
    expect(document.querySelector("input.flatpickr-hour")).toBeInTheDocument()
    expect(document.querySelector("input.flatpickr-minute")).toBeInTheDocument()
  })

  test("renders a time picker with a clock icon instead of a calendar icon if configured to do so", async () => {
    render(<DateTimePicker enableTime noCalendar />)
    expect(screen.getByTitle("Time")).toBeInTheDocument()
    expect(screen.queryByTitle("Calendar")).not.toBeInTheDocument()
  })

  test("executes an onOpen handler when the user clicks the Datepicker and the calendar opens", async () => {
    const user = userEvent.setup()
    render(<DateTimePicker onOpen={mockOnOpen} />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    expect(mockOnOpen).toHaveBeenCalled()
  })

  test("closes the calendar and executes an onClose handler when the user clicks outside the calendar", async () => {
    const user = userEvent.setup()
    render(<DateTimePicker onClose={mockOnClose} />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    await user.click(document.body)
    expect(mockOnClose).toHaveBeenCalled()
  })

  test("executes an onChange handler when the user changes the selected date", async () => {
    const user = userEvent.setup()
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowFullMonth = tomorrow.toLocaleString("default", {
      month: "long",
    })
    const tomorrowDay = tomorrow.getDate()
    const tomorrowFullYear = tomorrow.getFullYear()
    const tomorrowLabel = `${tomorrowFullMonth} ${tomorrowDay}, ${tomorrowFullYear}`
    render(<DateTimePicker value={today} onChange={mockOnChange} />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    const tomorrowEl = screen.getByLabelText(tomorrowLabel)
    await user.click(tomorrowEl)
    expect(mockOnChange).toHaveBeenCalled()
  })

  test("executes an onYearChange handler when the user changes the year", async () => {
    const user = userEvent.setup()
    render(<DateTimePicker onYearChange={mockOnYearChange} />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    const yearInputUp = document.querySelector(".numInputWrapper > .arrowUp")
    await user.click(yearInputUp)
    expect(mockOnYearChange).toHaveBeenCalled()
  })

  test("executes an onMonthChange handler when the user changes the month by clicking an arrow", async () => {
    const user = userEvent.setup()
    render(<DateTimePicker onMonthChange={mockOnMonthChange} />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    const nextMonthButton = document.querySelector(".flatpickr-next-month")
    await user.click(nextMonthButton)
    expect(mockOnMonthChange).toHaveBeenCalled()
  })

  test("renders a className as passed", async () => {
    render(<DateTimePicker className="my-custom-class" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveClass("my-custom-class")
  })

  test("renders other props as passed", async () => {
    render(<DateTimePicker data-lolol="527" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("data-lolol", "527")
  })
})
