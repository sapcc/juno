import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Checkbox } from "./index"


describe("Checkbox", () => {
	
	test("renders a valid html input type checkbox", async () => {
		render(<Checkbox />)
		expect(screen.getByRole("checkbox")).toBeInTheDocument()
		expect(screen.getByRole("checkbox")).toHaveAttribute('type', "checkbox")
	})
	
	test("renders a checkbox with a name as passed", async () => {
		render(<Checkbox name="My Checkbox" />)
		expect(screen.getByRole("checkbox")).toBeInTheDocument()
		expect(screen.getByRole("checkbox")).toHaveAttribute('name', "My Checkbox")
	})
	
	test("renders a checkbox with a value as passed", async () => {
		render(<Checkbox value="ValueAsPassed" />)
		expect(screen.getByRole("checkbox")).toBeInTheDocument()
		expect(screen.getByRole("checkbox")).toHaveAttribute('value', "ValueAsPassed")
	})
	
	test("renders a checked checkbox as passed", async () => {
		render(<Checkbox checked={true} />)
		expect(screen.getByRole("checkbox")).toBeInTheDocument()
		expect(screen.getByRole("checkbox")).toHaveAttribute('checked')
	})
	
	test("renders all props as passed", async () => {
		render(<Checkbox id="check-1" data-test="23" />)
		expect(screen.getByRole("checkbox")).toBeInTheDocument()
		expect(screen.getByRole("checkbox")).toHaveAttribute('id', "check-1")
		expect(screen.getByRole("checkbox")).toHaveAttribute('data-test', "23")
	})
	
	test("fire handler on change as passed", async () => {
		const handleChange = jest.fn()
		const { container } = render(
			<Checkbox onChange={handleChange} />
		)
		const checkbox = container.firstChild
		fireEvent.click(checkbox)
		expect(handleChange).toHaveBeenCalledTimes(1)
		expect(checkbox.checked).toBe(true)
	})
	
	// test("renders a multiple-checked checkbox as passed", async () => {
		// 	render(<Checkbox checked="multiple" />)
		// 	expect(screen.getByRole("checkbox")).toBeInTheDocument()
		// 	expect(screen.getByRole("checkbox")).toHaveAttribute('checked', "multiple")
		// })

})