import * as React from "react"
import { render, screen } from "@testing-library/react"
import { ContextMenuItem } from "./index.js"

describe("ContextMenuItem", () => {
	
  test("renders a ContextMenuItem", async () => {
	render(<ContextMenuItem/>)
	expect(screen.getByRole("menuitem")).toBeInTheDocument()
	expect(screen.getByRole("menuitem")).toHaveClass("juno-contextmenu-item")
  })
  
  test("renders a plain ContextMenuItem when no href and no onClick props are passed", async () => {
	  render(<ContextMenuItem/>)
	  expect(screen.getByRole("menuitem")).toBeInTheDocument()
	  expect(screen.getByRole("menuitem")).toHaveClass("juno-contextmenu-item")
	  expect(screen.getByRole("menuitem")).not.toHaveClass("juno-contextmenu-item-anchor")
	  expect(screen.getByRole("menuitem")).not.toHaveClass("juno-contextmenu-item-button")
  })
  
  test("renders an anchor item when href prop is passed", async () => {
		render(<ContextMenuItem href="#"/>)
		expect(screen.getByRole("menuitem")).toBeInTheDocument()
		expect(screen.getByRole("menuitem")).toHaveClass("juno-contextmenu-item")
		expect(screen.getByRole("menuitem")).toHaveClass("juno-contextmenu-item-anchor")
		expect(screen.getByRole("menuitem")).not.toHaveClass("juno-contextmenu-item-button")
	})
	
	test("renders a button when onClick prop is passed", async () => {
		render(<ContextMenuItem onClick={() => {console.log("clicked")}} />)
		expect(screen.getByRole("menuitem")).toBeInTheDocument()
		expect(screen.getByRole("menuitem")).toHaveClass("juno-contextmenu-item")
		expect(screen.getByRole("menuitem")).toHaveClass("juno-contextmenu-item-button")
		expect(screen.getByRole("menuitem")).not.toHaveClass("juno-contextmenu-item-anchor")
	})
  
 })