import * as React from "react"
import { render, screen } from "@testing-library/react"
import { MenuItem } from "./index.js"

describe("MenuItem", () => {
	
  test("renders a MenuItem", async () => {
	render(<MenuItem/>)
	expect(screen.getByRole("menuitem")).toBeInTheDocument()
	expect(screen.getByRole("menuitem")).toHaveClass("juno-menu-item")
  })
  
  test("renders a plain MenuItem when no href and no onClick props are passed", async () => {
	  render(<MenuItem/>)
	  expect(screen.getByRole("menuitem")).toBeInTheDocument()
	  expect(screen.getByRole("menuitem")).toHaveClass("juno-menu-item")
	  expect(screen.getByRole("menuitem")).not.toHaveClass("juno-menu-item-anchor")
	  expect(screen.getByRole("menuitem")).not.toHaveClass("juno-menu-item-button")
  })
  
  test("renders an anchor menu item when href prop is passed", async () => {
		render(<MenuItem href="#"/>)
		expect(screen.getByRole("menuitem")).toBeInTheDocument()
		expect(screen.getByRole("menuitem")).toHaveClass("juno-menu-item")
		expect(screen.getByRole("menuitem")).toHaveClass("juno-menu-item-anchor")
		expect(screen.getByRole("menuitem")).not.toHaveClass("juno-menu-item-button")
	})
	
	test("renders a button menu item when onClick prop is passed", async () => {
		render(<MenuItem onClick={() => {console.log("clicked")}} />)
		expect(screen.getByRole("menuitem")).toBeInTheDocument()
		expect(screen.getByRole("menuitem")).toHaveClass("juno-menu-item")
		expect(screen.getByRole("menuitem")).toHaveClass("juno-menu-item-button")
		expect(screen.getByRole("menuitem")).not.toHaveClass("juno-menu-item-anchor")
	})
  
 })