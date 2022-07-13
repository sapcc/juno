import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { FilterInput } from "./index"

describe("FilterInput", () => {
	
	test("renders a FilterInput", async () => {
		render(<FilterInput data-testid="filter-input" />)
		expect(screen.getByTestId("filter-input")).toBeInTheDocument()
		expect(screen.getByTestId("filter-input")).toHaveClass("juno-filter-input")
	})
	
	test("renders a FilterInput with a Select and a TextInput", async () => {
		render(<FilterInput />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toBeInTheDocument()
	})
	
	test("renders a Select with an aria-label as passed", async () => {
		render(<FilterInput keyLabel={"my select"}/>)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveAttribute("aria-label", "my select")
	})
	
	test("renders a Select with a default option selected if no filterKey is passed", async () => {
		render(<FilterInput />)
		expect(screen.getByRole("option", { name: "Select Filter" })).toBeInTheDocument()
		expect(screen.getByRole("option", { name: "Select Filter" }).selected).toBe(true)
	})
	
	test("renders a Select with a default option as passed", async () => {
		render(<FilterInput keyLabel="My Custom Key Label" />)
		expect(screen.getByRole("option", { name: "My Custom Key Label" })).toBeInTheDocument()
		expect(screen.getByRole("option", { name: "My Custom Key Label" }).selected).toBe(true)
	})
	
	test("renders a select with options and values as passed", async () => {
		render(<FilterInput options={[{label: "option 1", value: "option-1"}, {label: "option 2", value: "option-2"}]} />)
		expect(screen.getByRole("option", {name: "option 1"})).toHaveValue("option-1")
		expect(screen.getByRole("option", {name: "option 2"})).toHaveValue("option-2")
	})
	
	test("renders a text input with an aria-label as passed", async () => {
		render(<FilterInput valueLabel={"my value input"}/>)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute("aria-label", "my value input")
	})
	
	test("renders a selected filter as passed", async () => {
		const filterOptions = [{label: "OS", value: "byOs"}, {label: "Region", value: "byRegion"}]
		render(<FilterInput options={filterOptions} filterKey="byRegion" />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("option", { name: "Region" }).selected).toBe(true)
	})
	
	test("allows users to change the filter key", async () => {
		const filters = [{label: "OS", value: "byOs"}, {label: "Region", value: "byRegion"}, {label: "Time Zone", value: "byTimezone"}]
		render(<FilterInput options={filters} />)
		userEvent.selectOptions(
			screen.getByRole("combobox"),
			screen.getByRole("option", { name: "Time Zone" }),			
		)
		expect(screen.getByRole("option", { name: "Time Zone"}).selected).toBe(true)
	})
	
	test("should reset the filter value when the filter key changes", async () => {
		const filters = [{label: "OS", value: "byOs"}, {label: "Region", value: "byRegion"}, {label: "Time Zone", value: "byTimezone"}]
		render(<FilterInput options={filters} filterValue="MacOS" />)
		expect(screen.getByRole("textbox")).toHaveValue("MacOS")
		userEvent.selectOptions(
			screen.getByRole("combobox"),
			screen.getByRole("option", { name: "Region" }),
		)
		expect(screen.getByRole("textbox")).toHaveValue("")
	})
	
	test("renders a FilterInput with a value as passed", async () => {
		render(<FilterInput filterValue="123abc" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveValue("123abc")
	})
	
	test("renders a Close button when the Input has a value", async () => {
		render(<FilterInput filterValue="123" />)
		expect(screen.getByTitle("Clear")).toBeInTheDocument()
	})
	
	test("executes a handler as passed when the input value changes", async () => {
		const handleFilterValueChange = jest.fn()
		render(<FilterInput onFilterValueChange={handleFilterValueChange} />)
		userEvent.type(screen.getByRole("textbox"), "987")
		expect(handleFilterValueChange).toHaveBeenCalledTimes(3)
	})
	
	test("empties the field when Clear button is clicked", async () => {
		render(<FilterInput filterValue="abc" />)
		expect(screen.getByTitle("Clear")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveValue("abc")
		userEvent.click(screen.getByTitle("Clear"))
		expect(screen.getByRole("textbox")).toHaveValue("")
	})
	
	test("executes a handler as passed when Filter icon is clicked", async () => {
		const handleFilter = jest.fn()
		render(<FilterInput onFilter={handleFilter} />)
		userEvent.click(screen.getByTitle("Filter"))
		expect(handleFilter).toHaveBeenCalledTimes(1)
	})
	
	test("renders a custom class to the row as passed", async () => {
		render(<FilterInput data-testid="filter-input" className="my-custom-class" />)
		expect(screen.getByTestId("filter-input")).toBeInTheDocument()
		expect(screen.getByTestId("filter-input")).toHaveClass("my-custom-class")
	})
	
	test("renders all props as passed", async () => {
		render(<FilterInput data-testid="filter-input" data-lolol="some-prop" />)
		expect(screen.getByTestId("filter-input")).toBeInTheDocument()
		expect(screen.getByTestId("filter-input")).toHaveAttribute("data-lolol", 'some-prop')
	})
	
})