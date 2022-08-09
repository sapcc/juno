import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Menu } from "./index"
import { MenuItem } from "../MenuItem/index.js"

describe("Menu", () => {
	
  test("renders a Menu", async () => {
	  render(<Menu />)
	  expect(screen.getByRole("menu")).toBeInTheDocument()
  })
  
  test("renders a Menu with Children as passed", async () => {
    render(
      <Menu>
        <MenuItem label="Menu Item 1" href="#" />
      </Menu>
    )
    expect(screen.getByRole("menuitem")).toBeInTheDocument()
    expect(screen.getByRole("menuitem")).toHaveTextContent("Menu Item 1")
    expect(screen.getByRole("menuitem")).toHaveAttribute("href", "#")
  })
  
  test("renders a className as passed", async () => {
    render(<Menu className="my-class" />)
    expect(screen.getByRole("menu")).toBeInTheDocument()
    expect(screen.getByRole("menu")).toHaveClass("my-class")
  })
  
  test("renders props as passed", async () => {
    render(<Menu data-lolol="1 2 3"/>)
    expect(screen.getByRole("menu")).toBeInTheDocument()
    expect(screen.getByRole("menu")).toHaveAttribute("data-lolol", "1 2 3")
  })
  
})
  
  