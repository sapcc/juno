import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders learn react link", () => {
  render(<App />)
  const greetings = screen.getByText(/At vero eos et accusam/i)
  expect(greetings).toBeInTheDocument()
})
