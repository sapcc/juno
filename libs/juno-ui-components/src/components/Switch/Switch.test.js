import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Switch } from "./index"

describe("Switch", () => {
  
  test("renders a switch button", async () => {
	render(<Switch />)
	expect(screen.getByRole("switch")).toBeInTheDocument()
  })

})
