import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { TextInputRow } from "./index"

describe("TextInputRow", () => {
  test("renders a text input row", async () => {
    render(<TextInputRow data-testid="text-input-row" />)
    expect(screen.getByTestId("text-input-row")).toBeInTheDocument()
  })

  test("renders an text input row with an input type email as passed", async () => {
    render(<TextInputRow type="email" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email")
  })

  // There is no implicit aria-role for password input, using getByLabelText instead as per recommendation: https://github.com/testing-library/dom-testing-library/issues/567
  test("renders a text input row with an input type password as passed", async () => {
    render(<TextInputRow type="password" label="Password" id="pw" />)
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
  })

  test("renders a text input row with an input type number as passed", async () => {
    render(<TextInputRow type="number" />)
    expect(screen.getByRole("spinbutton")).toBeInTheDocument()
    expect(screen.getByRole("spinbutton")).toHaveAttribute("type", "number")
  })

  test("renders a text input row with an input type email as passed", async () => {
    render(<TextInputRow data-testid="text-input-row" type="email" />)
    expect(screen.getByTestId("text-input-row")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email")
  })

  test("renders a text input row with an input type email as passed", async () => {
    render(<TextInputRow data-testid="text-input-row" type="tel" />)
    expect(screen.getByTestId("text-input-row")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "tel")
  })

  test("renders a text input row with an input type email as passed", async () => {
    render(<TextInputRow data-testid="text-input-row" type="url" />)
    expect(screen.getByTestId("text-input-row")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "url")
  })

  test("renders a text input with a name as passed", async () => {
    render(<TextInputRow name="my-text-input" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("name", "my-text-input")
  })

  test("renders a text input with a value as passed", async () => {
    render(<TextInputRow value="Some Value" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("value", "Some Value")
  })

  test("renders a text input row with a text input and an associated label with an id as passed", async () => {
    render(
      <TextInputRow
        data-testid="text-input-row"
        label="my-text-input"
        id="text-input-row"
      />
    )
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByLabelText("my-text-input")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "text-input-row")
  })

  test("renders a text input with a placeholder as passed", async () => {
    render(<TextInputRow placeholder="Some Placeholder" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "Some Placeholder"
    )
  })

  test("renders a help text as passed", async () => {
    render(<TextInputRow helptext="Helptext goes here" />)
    expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
  })

  test("renders a required label as passed", async () => {
    render(<TextInputRow label="Required Input" required />)
    expect(document.querySelector(".required")).toBeInTheDocument()
  })

  test("renders a className to the row as passed", async () => {
    render(
      <TextInputRow data-testid="text-input-row" className="my-custom-class" />
    )
    expect(screen.getByTestId("text-input-row")).toHaveClass("my-custom-class")
  })

  test("renders a disabled text input as passed", async () => {
    render(<TextInputRow disabled />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toBeDisabled()
  })

  test("renders all props to the row as passed", async () => {
    render(<TextInputRow data-testid="text-input-row" data-lolol="some-prop" />)
    expect(screen.getByTestId("text-input-row")).toHaveAttribute(
      "data-lolol",
      "some-prop"
    )
  })

  test("fires onChange handler as passed", async () => {
    const handleChange = jest.fn()
    render(<TextInputRow onChange={handleChange} />)
    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "a" } })
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        _reactName: "onChange",
        target: input,
        type: "change",
      })
    )
  })
})
