import * as React from "react"
import { render, screen } from "@testing-library/react"
import { FilterPill } from "./index"

describe("FilterPill", () => {
  test("renders a FilterPill", async () => {
    render(<FilterPill data-testid="my-filterpill" />)
    expect(screen.getByTestId("my-filterpill")).toBeInTheDocument()
    expect(screen.getByTestId("my-filterpill")).toHaveClass("juno-filterpill")
  })

  test("renders a filter key label as passed", async () => {
    render(<FilterPill filterKeyLabel="My FilterPill Key" />)
    expect(screen.getByText("My FilterPill Key")).toBeInTheDocument()
  })

  test("renders a filter key if filter key label missing", async () => {
    render(<FilterPill filterKey="my_filterPill_key" />)
    expect(screen.getByText("my_filterPill_key")).toBeInTheDocument()
  })

  test("renders nothing if filter key label not set", async () => {
    render(<FilterPill data-testid="23" />)
    expect(screen.getByTestId("23")).toBeInTheDocument()
    expect(screen.getByTestId("23")).toHaveTextContent("")
  })

  test("renders a filter value label as passed", async () => {
    render(<FilterPill filterValueLabel="My FilterPill Value" />)
    expect(screen.getByText("My FilterPill Value")).toBeInTheDocument()
  })

  test("renders a filter value key if value label missing", async () => {
    render(<FilterPill filterValue="my_filterPill_value" />)
    expect(screen.getByText("my_filterPill_value")).toBeInTheDocument()
  })

  test("renders nothing if filter value or value label not set", async () => {
    render(<FilterPill data-testid="23" />)
    expect(screen.getByTestId("23")).toBeInTheDocument()
    expect(screen.getByTestId("23")).toHaveTextContent("")
  })

  test("an onClose handler is called as passed and returns the uid", () => {
    const handleClose = jest.fn()
    render(<FilterPill uid="uidAbc" onClose={handleClose} />)
    screen.getByRole("button").click()
    expect(handleClose).toHaveBeenCalledTimes(1)
    expect(handleClose).toHaveBeenCalledWith("uidAbc")
  })

  test("an onClose handler is called as passed and returns the filterKey if uid missing", () => {
    const handleClose = jest.fn()
    render(<FilterPill filterKey="abc" onClose={handleClose} />)
    screen.getByRole("button").click()
    expect(handleClose).toHaveBeenCalledTimes(1)
    expect(handleClose).toHaveBeenCalledWith("abc")
  })

  test("renders a custom className", async () => {
    render(
      <FilterPill data-testid="my-filterpill" className="my-custom-class" />
    )
    expect(screen.getByTestId("my-filterpill")).toBeInTheDocument()
    expect(screen.getByTestId("my-filterpill")).toHaveClass("my-custom-class")
  })

  test("renders all props as passed", async () => {
    render(<FilterPill data-testid="23" data-lolol={true} />)
    expect(screen.getByTestId("23")).toBeInTheDocument()
    expect(screen.getByTestId("23")).toHaveAttribute("data-lolol")
  })
})
