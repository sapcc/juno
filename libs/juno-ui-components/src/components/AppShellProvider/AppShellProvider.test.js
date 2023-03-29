import * as React from "react"
import { render, screen } from "@testing-library/react"
import { AppShellProvider } from "./index"

/** Tests need to be adjusted once we know how this will look */
describe("AppShellProvider", () => {
  test.skip("renders a AppShellProvider wrapper div with 'theme-dark' theme class by default", async () => {
    const { container } = render(<AppShellProvider></AppShellProvider>)
    expect(container.querySelector("div.juno-app-body")).toHaveClass(
      "theme-dark"
    )
  })

  test.skip("renders a AppShellProvider wrapper div with theme class as passed", async () => {
    const { container } = render(
      <AppShellProvider theme="my-theme"></AppShellProvider>
    )
    expect(container.querySelector("div.juno-app-body")).toHaveClass("my-theme")
  })
})
