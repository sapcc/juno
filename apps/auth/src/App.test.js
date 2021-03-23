import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders auth app", () => {
  render(<App />)
  // const greetings = screen.getByText(/Hello this is Auth App/i)
  // expect(greetings).toBeInTheDocument()
})
