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
})
