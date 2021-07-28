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
	
	test("renders a custom class", async () => {
		render(<Select className="my-custom-class" />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveClass('my-custom-class')
	})
	
	test("renders a select element", async () => {
		render(<Select />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
	})
	
	test("fires onChange handler as passed", async () => {
		const handleChange = jest.fn()
		const { container } = render(
			<Select onChange={handleChange} />
		)
		const slct = container.firstChild
		fireEvent.change(slct, { target: { value: 'a' } })
		expect(handleChange).toHaveBeenCalledTimes(1)
	})
	
	
})