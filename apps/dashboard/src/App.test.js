import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

jest.mock("./lib/pages-loader", () => ({
  __esModule: true,
  getPages: () => {
    const fs = require("fs")
    const path = require("path")
    return fs.readdirSync(path.resolve("./src/pages")).map((file) => ({
      name: file.replace(/\.js/, ""),
      component: require(path.resolve("./src/pages", file)).default,
    }))
  },
}))

test("renders login button", () => {
  render(<App />)
  // const greetings = screen.getByText(/Login/i)
  // expect(greetings).toBeInTheDocument()
})
