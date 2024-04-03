import * as React from "react"
import { render, screen } from "@testing-library/react"
import { AppShellProvider } from "./index"

describe("AppShellProvider", () => {
  test("renders an AppShellProvider wrapper div with 'theme-dark' theme class by default", async () => {
    render(<AppShellProvider shadowRoot={false} />)
    expect(document.querySelector(".juno-app-body")).toHaveClass("theme-dark")
  })

  test("renders an AppShellProvider wrapper div with theme class as passed", async () => {
    render(<AppShellProvider shadowRoot={false} theme="my-theme" />)
    expect(document.querySelector("div.juno-app-body")).toHaveClass("my-theme")
  })
})
