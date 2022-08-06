import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Menu } from "./index"

describe("Menu", () => {
	
  test("renders a Menu", async () => {
	render(<Menu />)
	expect(screen.getByRole("menu")).toBeInTheDocument()
  })
  
})
  
  