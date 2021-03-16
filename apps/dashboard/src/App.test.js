import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders login button", () => {
  render(<App />)
  const greetings = screen.getByText(/Login/i)
  expect(greetings).toBeInTheDocument()
})
