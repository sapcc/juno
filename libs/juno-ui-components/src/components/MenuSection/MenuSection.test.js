import * as React from "react"
import { render, screen } from "@testing-library/react"
import { MenuSection } from "./index.js"

describe("MenuSection", () => {
	
  test("renders a MenuSection", async () => {
	render(<MenuSection data-testid="menu-section" />)
	expect(screen.getByTestId("menu-section")).toBeInTheDocument()
	expect(screen.getByTestId("menu-section")).toHaveClass("juno-menu-section")
  })
  
 })