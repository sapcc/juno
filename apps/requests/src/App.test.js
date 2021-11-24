import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders learn react link", () => {
  render(<App />)
  const greetings = screen.getByText(/Designate/i)
  expect(greetings).toBeInTheDocument()
})
