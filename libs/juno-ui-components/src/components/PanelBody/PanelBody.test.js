import * as React from "react"
import { render, screen } from "@testing-library/react"
import { PanelBody } from "./index"

describe("PanelBody", () => {
  test("renders a panel body", async () => {
    render(<PanelBody data-testid="panel-body" />)
    expect(screen.getByTestId("panel-body")).toBeInTheDocument()
    expect(screen.getByTestId("panel-body")).toHaveClass(
      "juno-panel-body"
    )
  })

  test("renders a panel body with overflow auto", async () => {
    render(<PanelBody data-testid="panel-body" />)
    expect(screen.getByTestId("panel-body")).toBeInTheDocument()
    expect(screen.getByTestId("panel-body")).toHaveClass("overflow-auto")
  })

  test("renders children as passed", async () => {
    render(
      <PanelBody data-testid="panel-body">
        <button></button>
      </PanelBody>
    )
    expect(screen.getByTestId("panel-body")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  test("renders a custom className", async () => {
    render(
      <PanelBody
        data-testid="panel-body"
        className="my-custom-classname"
      />
    )
    expect(screen.getByTestId("panel-body")).toBeInTheDocument()
    expect(screen.getByTestId("panel-body")).toHaveClass(
      "my-custom-classname"
    )
  })

  test("renders all props", async () => {
    render(<PanelBody data-testid="panel-body" data-lolol="some-prop" />)
    expect(screen.getByTestId("panel-body")).toBeInTheDocument()
    expect(screen.getByTestId("panel-body")).toHaveAttribute(
      "data-lolol",
      "some-prop"
    )
  })
  
})
