import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { NSelect } from "./index"

describe("NSelect", () => {
  test("renders a select element", async () => {
    render(<NSelect />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  test("renders a select element with a name as passed", async () => {
    render(<NSelect name="my-select" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute("name", "my-select")
  })

  test("renders a select element with an id as passed", async () => {
    render(<NSelect id="my-select" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute("id", "my-select")
  })

  test("renders a custom className", async () => {
    render(<NSelect className="my-custom-class" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("my-custom-class")
  })

  test("renders a disabled select as passed", async () => {
    render(<NSelect disabled />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  test("renders an invalid Select as passed", async () => {
    render(<NSelect invalid />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-invalid")
    expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
  })

  test("renders a valid Select as passed", async () => {
    render(<NSelect valid />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-valid")
    expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
  })

  test("renders a Select with an error as passed", async () => {
    render(<NSelect error />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toBeDisabled()
    expect(screen.getByRole("combobox")).toHaveClass("juno-select-error")
    expect(screen.getByTitle("Error")).toBeInTheDocument()
  })

  test("renders children as passed", async () => {
    render(
      <NSelect>
        <option data-testid="option">Option</option>
      </NSelect>
    )
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByTestId("option")).toBeInTheDocument()
  })

  test("executes onClick handler as passed", async () => {
    const onClickSpy = jest.fn()
    render(<NSelect onClick={onClickSpy} />)
    const select = screen.getByRole("combobox")
    select.click()
    expect(onClickSpy).toHaveBeenCalled()
  })

  test("executes onChange handler as passed", async () => {
    const handleChange = jest.fn()
    const { container } = render(<NSelect onChange={handleChange} />)
    const select = screen.getByRole("combobox")
    fireEvent.change(select, { target: { value: "a" } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  test("does not execute onClick handler when disabled", async () => {
    const onClickSpy = jest.fn()
    render(<NSelect onClick={onClickSpy} disabled />)
    screen.getByRole("combobox").click()
    expect(onClickSpy).not.toHaveBeenCalled()
  })

  test("does not execute onChange handler when disabled", async () => {
    const onChangeSpy = jest.fn()
    render(<NSelect onChange={onChangeSpy} disabled />)
    screen.getByRole("combobox").click()
    expect(onChangeSpy).not.toHaveBeenCalled()
  })

  test("renders a loading Select as passed", async () => {
    render(<NSelect loading />)
    expect(screen.getByRole("combobox")).toBeDisabled()
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  test("can not be clicked when loading", async () => {
    const onClickSpy = jest.fn()
    render(<NSelect loading onClick={onClickSpy} />)
    screen.getByRole("combobox").click()
    expect(onClickSpy).not.toHaveBeenCalled()
  })

  test("renders all props as passed", async () => {
    render(<NSelect data-lolol="some-random-prop" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "data-lolol",
      "some-random-prop"
    )
  })
})
