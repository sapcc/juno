import * as React from "react"
import { render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Filters } from "./index"
import { SearchInput } from "../SearchInput/index"

describe("Filters", () => {
	
	test("renders Filters", async () => {
		render(<Filters data-testid="my-filters" />)
		expect(screen.getByTestId("my-filters")).toBeInTheDocument()
		expect(screen.getByTestId("my-filters")).toHaveClass("juno-filters")
	})
	
	test("renders a FilterInput when filter prop is passed", async () => {
		const filters = {label: "Filter", options: [{label: "option 1", value: "option-1"}]}
		render(<Filters filters={filters} />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveClass("juno-filter-input-select")
	})
	
	test("renders Select with options as passed", async () => {
		const filters = {label: "Filter", options: [{label: "option 1", value: "option-1"}, {label: "option 2", value: "option-2"}]}
		render(<Filters filters={filters} />)
		expect(screen.getByRole("option", {name: "option 1"})).toHaveValue("option-1")
		expect(screen.getByRole("option", {name: "option 2"})).toHaveValue("option-2")
	})
	
	test("renders a Filter value as passed", async () => {
		const filters = {label: "Filter", options: [{label: "option 1", value: "option-1"}]}
		render(<Filters filters={filters} filterValue="abc" />)
		expect(screen.getByRole("textbox")).toHaveValue("abc")
	})

	test("executes a handler as passed when the filter input value changes", async () => {
		const handleFilterChange = jest.fn()
		const filters = {label: "Filter", options: [{label: "option 1", value: "option-1"}]}
		render(<Filters filters={filters} onFilterChange={handleFilterChange} />)
		userEvent.type(screen.getByRole("textbox"), "123")
		expect(handleFilterChange).toHaveBeenCalledTimes(3)
	})
	
	test("executes a handler as passed when the filter icon is clicked", async () => {
		const handleFilter = jest.fn()
		const filters = {label: "Filter", options: [{label: "option 1", value: "option-1"}]}
		render(<Filters filters={filters} onFilter={handleFilter} />)
		userEvent.click(screen.getByTitle("Filter"))
		expect(handleFilter).toHaveBeenCalledTimes(1)
	})
	
	test("clears the filter input and executes a handler as passed when the filter input clear icon is clicked", async () => {
		const handleClear = jest.fn()
		const filters = {label: "Filter", options: [{label: "option 1", value: "option-1"}]}
		render(<Filters filters={filters} filterValue="some option" onFilterClear={handleClear} />)
		expect(screen.getByRole("textbox")).toHaveValue("some option")
		userEvent.click(screen.getByTitle("Clear"))
		expect(screen.getByRole("textbox")).toHaveValue("")
		expect(handleClear).toHaveBeenCalledTimes(1)
	})
	
	test("renders a SearchInput as passed", async () => {
		render(<Filters><SearchInput/></Filters>)
		expect(screen.getByRole("searchbox")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		render(<Filters data-testid="my-filters" className="my-custom-class" />)
		expect(screen.getByTestId("my-filters")).toBeInTheDocument()
		expect(screen.getByTestId("my-filters")).toHaveClass("my-custom-class")
	})
	
	test("renders all props as passed", async () => {
		render(<Filters data-testid="23" data-lolol={true}/>)
		expect(screen.getByTestId("23")).toBeInTheDocument()
		expect(screen.getByTestId("23")).toHaveAttribute('data-lolol')
	})
	
})