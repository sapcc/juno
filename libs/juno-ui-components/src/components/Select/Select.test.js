import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Select } from "./index"

describe("Select", () => {
	
	test("renders a select element", async () => {
		render(<Select />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
	})
	
	test("renders a select element with a name as passed", async () => {
		render(<Select name="my-select"/>)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveAttribute('name', "my-select")
	})
	
	test("renders a select element with an id as passed", async () => {
		render(<Select id="my-select"/>)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveAttribute('id', "my-select")
	})
	
	test("renders a custom class", async () => {
		render(<Select className="my-custom-class" />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveClass('my-custom-class')
	})
	
	test("renders a disabled select as passed", async () => {
		render(<Select disabled />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toBeDisabled()
	})
	
	test("renders children as passed", async () => {
		render(<Select><option data-testid="option">Option</option></Select>)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByTestId("option")).toBeInTheDocument()
		
	})
	
	test("renders all props as passed", async () => {
		render(<Select data-lolol="some-random-prop" />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveAttribute("data-lolol", 'some-random-prop')
	})
	
	test("fires onChange handler as passed", async () => {
		const handleChange = jest.fn()
		const { container } = render(
			<Select onChange={handleChange} />
		)
		const select = screen.getByRole('combobox')
		fireEvent.change(select, { target: { value: 'a' } })
		expect(handleChange).toHaveBeenCalledTimes(1)
	})
	
	
})