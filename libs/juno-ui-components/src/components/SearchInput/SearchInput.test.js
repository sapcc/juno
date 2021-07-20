import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { SearchInput } from "./index"


describe("SearchInput", () => {
	
	test("renders a valid html input type search", async () => {
		render(<SearchInput data-testid="search"/>)
		expect(screen.getByTestId("search")).toBeInTheDocument()
		expect(screen.getByTestId("search")).toHaveAttribute('type', "search")
	})
	
	test("renders a default name 'search'", async () => {
		render(<SearchInput data-testid="search" />)
		expect(screen.getByTestId("search")).toBeInTheDocument()
		expect(screen.getByTestId("search")).toHaveAttribute('name', "search")
	})
	
	test("renders a name as passed", async () => {
		render(<SearchInput data-testid="search" name="searchbox"/>)
		expect(screen.getByTestId("search")).toBeInTheDocument()
		expect(screen.getByTestId("search")).toHaveAttribute('name', "searchbox")
	})
	
	test("renders a default placeholder 'Search…'", async () => {
		render(<SearchInput data-testid="search" />)
		expect(screen.getByTestId("search")).toBeInTheDocument()
		expect(screen.getByTestId("search")).toHaveAttribute('placeholder', "Search…")
	})
	
	test("renders a placeholder as passed", async () => {
		render(<SearchInput data-testid="search" placeholder="My custom placeholder"/>)
		expect(screen.getByTestId("search")).toBeInTheDocument()
		expect(screen.getByTestId("search")).toHaveAttribute('placeholder', "My custom placeholder")
	})
	
	// various props, disabled
		
})