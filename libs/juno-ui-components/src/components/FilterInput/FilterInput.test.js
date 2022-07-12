import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
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
	
	test("renders a FilterInput with a value as passed", async () => {
		render(<FilterInput value="123abc" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveValue("123abc")
	})
	
	test("renders a Close button when the Input has a value", async () => {
		render(<FilterInput value="123" />)
		expect(screen.getByTitle("Clear")).toBeInTheDocument()
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