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

  test("renders warning if filter key label not set since it should be mandatori", async () => {
    render(<FilterPill data-testid="23" />)
    expect(screen.getByTestId("23")).toBeInTheDocument()
    expect(screen.getByTestId("23")).toHaveTextContent("filterKeyLabel not set")
  })

  test("renders a filter value label as passed", async () => {
    render(<FilterPill filterValueLabel="My FilterPill Value" />)
    expect(screen.getByText("My FilterPill Value")).toBeInTheDocument()
  })

  test("renders warning if filter value label not set since it should be mandatori", async () => {
    render(<FilterPill data-testid="23" />)
    expect(screen.getByTestId("23")).toBeInTheDocument()
    expect(screen.getByTestId("23")).toHaveTextContent(
      "filterValueLabel not set"
    )
  })

  test("an onClose handler is called as passed and returns the filterKey", () => {
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
