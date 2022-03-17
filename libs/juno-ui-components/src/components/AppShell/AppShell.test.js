import * as React from "react"
import { render, screen } from "@testing-library/react"
import { AppShell } from "./index"
import { PageHeader } from "../PageHeader"
import { PageFooter } from "../PageFooter"

describe("AppShell", () => {
  test("renders an app shell", async () => {
    render(<AppShell data-testid="app-shell" />)
    expect(screen.getByTestId("app-shell")).toBeInTheDocument()
    expect(screen.getByTestId("app-shell")).toHaveClass("juno-body")
  })

  test("renders an app shell with content heading", async () => {
    render(<AppShell data-testid="app-shell" contentHeading="My Heading" />)
    expect(screen.getByTestId("app-shell")).toBeInTheDocument()
    expect(screen.getByText("My Heading")).toBeInTheDocument()
  })

  test("renders an app shell with page heading passed as String", async () => {
    render(<AppShell data-testid="app-shell" pageHeader="My Page Heading" />)
    expect(screen.getByTestId("app-shell")).toBeInTheDocument()
    expect(screen.getByText("My Page Heading")).toBeInTheDocument()
  })

  test("renders an app shell with page heading passed as component", async () => {
    render(<AppShell data-testid="app-shell" pageHeader={<PageHeader data-testid="page-header" heading="My Page Heading" />} />)
    expect(screen.getByTestId("app-shell")).toBeInTheDocument()
    expect(screen.getByTestId("page-header")).toBeInTheDocument()
    expect(screen.getByText("My Page Heading")).toBeInTheDocument()
  })

  test("renders an app shell with custom page footer passed as component", async () => {
    render(<AppShell data-testid="app-shell" pageHeader={<PageFooter data-testid="page-footer">My Page Footer</PageFooter>} />)
    expect(screen.getByTestId("app-shell")).toBeInTheDocument()
    expect(screen.getByTestId("page-footer")).toBeInTheDocument()
    expect(screen.getByText("My Page Footer")).toBeInTheDocument()
  })

  test("renders children as passed", async () => {
    render(
      <AppShell data-testid="app-shell">
        <button></button>
      </AppShell>
    )
    expect(screen.getByTestId("app-shell")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  test("renders a custom className", async () => {
    render(<AppShell data-testid="app-shell" className="my-custom-classname" />)
    expect(screen.getByTestId("app-shell")).toBeInTheDocument()
    expect(screen.getByTestId("app-shell")).toHaveClass("my-custom-classname")
  })

  test("renders all props", async () => {
    render(<AppShell data-testid="app-shell" data-lolol="some-prop" />)
    expect(screen.getByTestId("app-shell")).toBeInTheDocument()
    expect(screen.getByTestId("app-shell")).toHaveAttribute(
      "data-lolol",
      "some-prop"
    )
  })
})
