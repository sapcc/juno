import * as React from "react"
import { render, screen } from "@testing-library/react"
import { ContextMenuItem } from "./index.js"

describe("ContextMenuItem", () => {
	
  test("renders a ContextMenuItem", async () => {
	render(<ContextMenuItem/>)
	expect(screen.getByRole("menuitem")).toBeInTheDocument()
	expect(screen.getByRole("menuitem")).toHaveClass("juno-contextmenu-item")
  })
  
 })