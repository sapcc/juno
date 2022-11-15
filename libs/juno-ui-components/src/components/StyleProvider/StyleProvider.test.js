import * as React from "react"
import { render, screen } from "@testing-library/react"
import { StyleProvider } from "./index"


describe("StyleProvider", () => {
  
  test("renders a StyleProvider wrapper div with 'theme-dark' theme class by default", async () => {
		const { container } = render(<StyleProvider></StyleProvider>)
    expect(container.firstChild).toHaveClass('theme-dark')
	})

  test("renders a StyleProvider wrapper div with theme class as passed", async () => {
		const { container } = render(<StyleProvider theme="my-theme"></StyleProvider>)
    expect(container.firstChild).toHaveClass('theme-my-theme')
	})

  
})