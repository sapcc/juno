import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Primary } from "./stories.js"
import "@testing-library/jest-dom/extend-expect"

describe("Button", () => {
  test("renders a default button with text", async () => {
    render(<Primary>Click me</Primary>)
    expect(screen.getByText("Click me")).toBeInTheDocument()
    // expect(screen.getByText("Click me")).toHaveClass(
    //   "text-theme-on-default",
    //   "bg-theme-default"
    // )
  })
})
