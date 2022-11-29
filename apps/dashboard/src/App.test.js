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

test("renders Converged Cloud heading", async () => {
  render(<App />)
  console.log(screen)
  const text = await screen.getByAltText(/Converged Cloud/i)
  expect(text).toBeInTheDocument()
})
