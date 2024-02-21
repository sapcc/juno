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
  //   render(<Datepicker label="The Datepicker Label" id="my-textinput"/>)
  //   expect(document.querySelector(".juno-label")).toBeInTheDocument()
  //   expect(document.querySelector(".juno-label")).toHaveTextContent("The Datepicker Label")
  // })
  //
  test("renders an id as passed", async () => {
    render(<DateTimePicker id="my-datepicker" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "my-datepicker")
  })

  test("renders a name as passed", async () => {
    render(<DateTimePicker name="my-name" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("name", "my-name")
  })

  test("renders a datepicker with an auto-generated id if no id is passed", async () => {
    render(<DateTimePicker />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("id")
    expect(screen.getByRole("textbox").getAttribute("id")).toMatch(
      "juno-datetimepicker"
    )
  })

  // test("renders a datepicker with a label associated by an id as passed", async () => {
  //   render(<Datepicker label="The Datepicker Label" id="dp-1"/>)
  //   expect(screen.getByRole("textbox")).toBeInTheDocument()
  //   expect(screen.getByRole("textbox")).toHaveAttribute("id")
  //   expect(screen.getByRole("textbox").getAttribute("id")).toMatch("dp-1")
  //   expect(screen.getByLabelText("The Datepicker Label")).toBeInTheDocument()
  // })
  //
  // test("renders a datepicker with a label associated by an auto-generated id if no id was passed ", async () => {
  //   render(<Datepicker label="This is a Datepicker" />)
  //   expect(screen.getByRole("textbox")).toBeInTheDocument()
  //   expect(screen.getByLabelText("This is a Datepicker")).toBeInTheDocument()
  // })

  test("renders a datepicker with a placholder as passed", async () => {
    render(<DateTimePicker placeholder="This is a placeholder" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "This is a placeholder"
    )
  })

  test("renders a disabled datepicker as passed", async () => {
    render(<DateTimePicker disabled />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toBeDisabled()
  })

  test("renders a Clear button if passed and when a date is set", async () => {
    render(<DateTimePicker value="2027-01-12" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByTitle("Clear")).toBeInTheDocument()
  })

  // test("renders a Datepicker marked as required", async () => {
  //   // Datepicker needs a label passed since the Label subcomponent is responsible for rendering the Required marker:
  //   render(<Datepicker label="Required Datepicker" required />)
  //   expect(document.querySelector(".juno-required")).toBeInTheDocument()
  // })

  // test("renders a helptext as passed", async () => {
  //   render(<Datepicker helptext="this is a helptext"/>)
  //   expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
  //   expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-help")
  //   expect(document.querySelector(".juno-form-hint")).toHaveTextContent("this is a helptext")
  // })
  //
  // test("renders a valid datepicker as passed", async () => {
  //   render(<Datepicker valid />)
  //   expect(screen.getByRole("textbox")).toBeInTheDocument()
  //   expect(screen.getByRole("textbox")).toHaveClass("juno-datepicker-input-valid")
  //   expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
  // })
  //
  // test("renders an invalid datepicker as passed", async () => {
  //   render(<Datepicker invalid />)
  //   expect(screen.getByRole("textbox")).toBeInTheDocument()
  //   expect(screen.getByRole("textbox")).toHaveClass("juno-datepicker-input-invalid")
  //   expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
  // })
  //
  // test("renders a successtext as passed and validates the element", async () => {
  //   render(<Datepicker successtext="great success!" />)
  //   expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
  //   expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-success")
  //   expect(document.querySelector(".juno-form-hint")).toHaveTextContent("great success!")
  //   expect(screen.getByRole("textbox")).toHaveClass("juno-datepicker-input-valid")
  //   expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
  // })
  //
  // test("renders an errortext as passed and invalidates the element", async () => {
  //   render(<Datepicker errortext="this is an error!" />)
  //   expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
  //   expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-error")
  //   expect(document.querySelector(".juno-form-hint")).toHaveTextContent("this is an error!")
  //   expect(screen.getByRole("textbox")).toHaveClass("juno-datepicker-input-invalid")
  //   expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
  // })

  test("renders a Datepicker with a time picker as passed", async () => {
    render(<DateTimePicker enableTime={true} dateFormat="Y-m-d H:i:S" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(document.querySelector(".flatpickr-time")).toBeInTheDocument()
    expect(screen.getByLabelText("Hour")).toBeInTheDocument()
    expect(screen.getByLabelText("Minute")).toBeInTheDocument()
  })

  test("renders a Datepicker with a time picker with seconds as passed", async () => {
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
})
