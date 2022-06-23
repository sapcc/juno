import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { TabList } from "./index"

describe("TabList", () => {
	
	test("renders a TabList", async () => {
		render(<TabList />)
		expect(screen.getByRole("tablist")).toBeInTheDocument()
		expect(screen.getByRole("tablist")).toHaveClass("juno-tablist")
	})
	
	test("renders a custom classNames", async () => {
		render(<TabList className="my-custom-class" />)
		expect(screen.getByRole("tablist")).toBeInTheDocument()
		expect(screen.getByRole("tablist")).toHaveClass("my-custom-class")
	})
	
	test("renders a default style TabList by default", async () => {
		render(<TabList />)
		expect(screen.getByRole("tablist")).toBeInTheDocument()
		expect(screen.getByRole("tablist")).toHaveClass("juno-tablist-default")
	})
	
	test("renders a content style TabList as passed", async () => {
		render(<TabList variant="content"/>)
		expect(screen.getByRole("tablist")).toBeInTheDocument()
		expect(screen.getByRole("tablist")).toHaveClass("juno-tablist-content")
	})
	
	test("renders all other props", async () => {
		render(<TabList data-lolol="13" />)
		expect(screen.getByRole("tablist")).toBeInTheDocument()
		expect(screen.getByRole("tablist")).toHaveAttribute("data-lolol", '13')
	})
	
})