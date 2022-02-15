import * as React from "react"
import { render, screen } from "@testing-library/react"
import { ContentArea } from "./index"

describe("ContentArea", () => {
  test("renders a content area", async () => {
    render(<ContentArea data-testid="content-area" />)
    expect(screen.getByTestId("content-area")).toBeInTheDocument()
    expect(screen.getByTestId("content-area")).toHaveClass(
      "juno-content-area"
    )
  })

  test("renders a content area with content area background color", async () => {
    render(<ContentArea data-testid="content-area" />)
    expect(screen.getByTestId("content-area")).toBeInTheDocument()
    expect(screen.getByTestId("content-area")).toHaveClass("bg-theme-content-area-bg")
  })

  test("renders a content area with flex grow", async () => {
    render(<ContentArea data-testid="content-area" />)
    expect(screen.getByTestId("content-area")).toBeInTheDocument()
    expect(screen.getByTestId("content-area")).toHaveClass("grow")
  })

  test("renders children as passed", async () => {
    render(
      <ContentArea data-testid="content-area">
        <button></button>
      </ContentArea>
    )
    expect(screen.getByTestId("content-area")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  test("renders a custom className", async () => {
    render(
      <ContentArea
        data-testid="content-area"
        className="my-custom-classname"
      />
    )
    expect(screen.getByTestId("content-area")).toBeInTheDocument()
    expect(screen.getByTestId("content-area")).toHaveClass(
      "my-custom-classname"
    )
  })

  test("renders all props", async () => {
    render(
      <ContentArea data-testid="content-area" data-lolol="some-prop" />
    )
    expect(screen.getByTestId("content-area")).toBeInTheDocument()
    expect(screen.getByTestId("content-area")).toHaveAttribute(
      "data-lolol",
      "some-prop"
    )
  })
})
