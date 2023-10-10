import * as React from "react"
import { render, screen } from "@testing-library/react"
import { AppShell } from "./index"
import { PageHeader } from "../PageHeader/PageHeader.component"
import { PageFooter } from "../PageFooter/PageFooter.component"
import { TopNavigation } from "../TopNavigation/TopNavigation.component"
import { SideNavigation } from "../SideNavigation/SideNavigation.component"

describe("AppShell", () => {
  test("renders an app shell", async () => {
    render(<AppShell data-testid="app-shell" />)
    expect(screen.getByTestId("app-shell")).toBeInTheDocument()
    expect(screen.getByTestId("app-shell")).toHaveClass("juno-body")
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
    render(<AppShell data-testid="app-shell" pageFooter={<PageFooter data-testid="page-footer">My Page Footer</PageFooter>} />)
    expect(screen.getByTestId("app-shell")).toBeInTheDocument()
    expect(screen.getByTestId("page-footer")).toBeInTheDocument()
    expect(screen.getByText("My Page Footer")).toBeInTheDocument()
  })

  test("renders an app shell with top navigation passed as component", async () => {
    render(<AppShell data-testid="app-shell" topNavigation={<TopNavigation data-testid="top-navigation"></TopNavigation>} />)
    expect(screen.getByTestId("app-shell")).toBeInTheDocument()
    expect(screen.getByTestId("top-navigation")).toBeInTheDocument()
  })
  
  test("renders an app shell with a side navigation passed as a component", async () => {
    render(
      <AppShell 
        data-testid="app-shell" 
        sideNavigation={<SideNavigation />}
      />
    )
    expect(screen.getByTestId("app-shell")).toBeInTheDocument()
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByRole("navigation")).toHaveClass("juno-sidenavigation")
  })
  
  test("renders an app shell with both a side and a top navigation as passed", async () => {
    render(
      <AppShell 
        data-testid="app-shell"
        sideNavigation={<SideNavigation data-testid="side-nav" />}
        topNavigation={<TopNavigation data-testid="top-nav" />}
      />
    )
    expect(screen.getByTestId("app-shell")).toBeInTheDocument()
    expect(screen.getAllByRole("navigation")).toHaveLength(2)
    expect(screen.getByTestId("side-nav")).toBeInTheDocument()
    expect(screen.getByTestId("top-nav")).toBeInTheDocument()
  })

  test("renders an embeddable app shell without page heading or footer", async () => {
    render(<AppShell data-testid="app-shell" embedded={true} pageHeader={<PageHeader data-testid="page-header" heading="My Page Heading" />} pageFooter={<PageFooter data-testid="page-footer">My Page Footer</PageFooter>} />)
    expect(screen.getByTestId("app-shell")).toBeInTheDocument()
    expect(screen.queryByTestId("page-header")).not.toBeInTheDocument()
    expect(screen.queryByText("My Page Heading")).not.toBeInTheDocument()
    expect(screen.queryByTestId("page-footer")).not.toBeInTheDocument()
    expect(screen.queryByText("My Page Footer")).not.toBeInTheDocument()
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
