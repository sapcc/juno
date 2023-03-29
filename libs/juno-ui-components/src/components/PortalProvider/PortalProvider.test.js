import * as React from "react"
import { render, screen } from "@testing-library/react"
import { PortalProvider } from "./index"

/** Tests need to be adjusted once we know how this will look */
describe("PortalProvider", () => {
  test.skip("renders a PortalProvider wrapper div with 'theme-dark' theme class by default", async () => {
    const { container } = render(<PortalProvider></PortalProvider>)
    expect(container.querySelector("div.juno-app-body")).toHaveClass(
      "theme-dark"
    )
  })

  test.skip("renders a PortalProvider wrapper div with theme class as passed", async () => {
    const { container } = render(
      <PortalProvider theme="my-theme"></PortalProvider>
    )
    expect(container.querySelector("div.juno-app-body")).toHaveClass("my-theme")
  })
})
