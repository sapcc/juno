import React from "react"
import { render, screen, act } from "@testing-library/react"
import App from "./App"
import { send, on } from "communicator"
import { AUTH_GET_TOKEN } from "./eventsInterface"

test("renders auth app", () => {
  render(<App />)

  act(() => {
    send(AUTH_GET_TOKEN)
  })

  const loginTitle = screen.getAllByText(/Login/i)
  expect(loginTitle.length > 0).toBe(true)
})
