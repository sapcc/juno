import React from "react"
import { render, screen, act } from "@testing-library/react"
import App from "./App"

test("renders auth app", () => {
  render(<App />)

  const loginTitle = screen.getAllByText(/Whois/i)
  expect(loginTitle.length > 0).toBe(true)
})
