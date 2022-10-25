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
	
	test("renders a menu item with an icon as passed", async () => {
		render(<MenuItem icon="warning"/>)
		expect(screen.getByRole("img")).toHaveAttribute("alt", "warning")
	})
	
	test("renders children as passed", async () => {
		render(<MenuItem><button>Child Button</button></MenuItem>)
		expect(screen.getByRole("button", {name: "Child Button"})).toBeInTheDocument()
	})
	
	test("executes an onClick handler as passed", async () => {
		const onClickSpy = jest.fn()
		render(<MenuItem onClick={onClickSpy} />)
		screen.getByRole("menuitem").click()
		expect(onClickSpy).toHaveBeenCalled()
	})
  
 })