import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Pill } from "./index"

describe("Pill", () => {
  test("renders a Pill", async () => {
    render(
      <Pill
        data-testid="my-Pill"
        pillKey="TheRequiredKey"
        pillValue="TheRequiredValue"
      />
    )
    expect(screen.getByTestId("my-Pill")).toBeInTheDocument()
    expect(screen.getByTestId("my-Pill")).toHaveClass("juno-pill")
  })

  test("renders a pill key label as passed", async () => {
    render(
      <Pill
        pillKeyLabel="My Pill Key"
        pillKey="TheRequiredKey"
        pillValue="TheRequiredValue"
      />
    )
    expect(screen.getByText("My Pill Key")).toBeInTheDocument()
  })

  test("renders a pill key if pill key label missing", async () => {
    render(<Pill pillKey="my_Pill_key" pillValue="TheRequiredValue" />)
    expect(screen.getByText("my_Pill_key")).toBeInTheDocument()
  })

  test("renders only value if pill key label not set", async () => {
    // the attribute pillKey and pillValue are required keep them empty to test render nothing
    render(<Pill data-testid="23" pillKey="" pillValue="TheRequiredValue" />)
    expect(screen.getByTestId("23")).toBeInTheDocument()
    expect(screen.getByTestId("23")).toHaveTextContent("TheRequiredValue")
  })

  test("renders a pill value label as passed", async () => {
    render(
      <Pill
        pillValue="TheRequiredValue"
        pillValueLabel="My Pill Value"
        pillKey="TheRequiredKey"
      />
    )
    expect(screen.getByText("My Pill Value")).toBeInTheDocument()
  })

  test("renders a pill value if value label missing", async () => {
    render(<Pill pillKey="TheRequiredKey" pillValue="my_Pill_value" />)
    expect(screen.getByText("my_Pill_value")).toBeInTheDocument()
  })

  test("renders information about missing value if pill value or value label not given", async () => {
    // the attribute pillKey and pillValue are required keep them empty to test render nothing
    render(<Pill data-testid="23" pillKey="" pillValue="" />)
    expect(screen.getByTestId("23")).toBeInTheDocument()
    expect(screen.getByTestId("23")).toHaveTextContent("set pillValue or pillValueLabel")
  })

  test("an onClose handler is called as passed and returns the uid", () => {
    const handleClose = jest.fn()
    render(
      <Pill
        uid="uidAbc"
        pillKey="TheRequiredKey"
        pillValue="TheRequiredValue"
        closeable={true}
        onClose={handleClose}
      />
    )
    screen.getByRole("button").click()
    expect(handleClose).toHaveBeenCalledTimes(1)
    expect(handleClose).toHaveBeenCalledWith("uidAbc")
  })

  test("an onClose handler is called as passed and returns the pillKey if uid missing", () => {
    const handleClose = jest.fn()
    render(
      <Pill
        pillKey="abc"
        pillValue="TheRequiredValue"
        closeable={true}
        onClose={handleClose}
      />
    )
    screen.getByRole("button").click()
    expect(handleClose).toHaveBeenCalledTimes(1)
    expect(handleClose).toHaveBeenCalledWith("abc")
  })

  test("renders a custom className", async () => {
    render(
      <Pill
        data-testid="my-Pill"
        pillKey="TheRequiredKey"
        pillValue="TheRequiredValue"
        className="my-custom-class"
      />
    )
    expect(screen.getByTestId("my-Pill")).toBeInTheDocument()
    expect(screen.getByTestId("my-Pill")).toHaveClass("my-custom-class")
  })

  test("renders all props as passed", async () => {
    render(
      <Pill
        data-testid="23"
        pillKey="TheRequiredKey"
        pillValue="TheRequiredValue"
        data-lolol={true}
      />
    )
    expect(screen.getByTestId("23")).toBeInTheDocument()
    expect(screen.getByTestId("23")).toHaveAttribute("data-lolol")
  })
})
