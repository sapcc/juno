import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Radio } from "./index"


describe("Radio", () => {
	
	test("renders a valid html input type radio", async () => {
		render(<Radio />)
		expect(screen.getByRole("radio")).toBeInTheDocument()
		expect(screen.getByRole("radio")).toHaveAttribute('type', "radio")
	})
	
	test("renders a radio with a name as passed", async () => {
		render(<Radio name="My Radio" />)
		expect(screen.getByRole("radio")).toBeInTheDocument()
		expect(screen.getByRole("radio")).toHaveAttribute('name', "My Radio")
	})
	
	test("renders a radio with a value as passed", async () => {
		render(<Radio value="ValueAsPassed" />)
		expect(screen.getByRole("radio")).toBeInTheDocument()
		expect(screen.getByRole("radio")).toHaveAttribute('value', "ValueAsPassed")
	})
	
	test("renders a checked radio as passed", async () => {
		render(<Radio checked={true} />)
		expect(screen.getByRole("radio")).toBeInTheDocument()
		expect(screen.getByRole("radio")).toHaveAttribute('checked')
	})
	
	test("renders no checked attribute if false", async () => {
		render(<Radio checked={false} />)
		expect(screen.getByRole("radio")).toBeInTheDocument()
		expect(screen.getByRole("radio")).not.toHaveAttribute('checked')
	})
	
	test("renders a custom className", async () => {
		render(<Radio className="my-custom-class" />)
		expect(screen.getByRole("radio")).toBeInTheDocument()
		expect(screen.getByRole("radio")).toHaveClass('my-custom-class')
	})
	
	test("renders all props as passed", async () => {
		render(<Radio id="radio-1" data-test="47" />)
		expect(screen.getByRole("radio")).toBeInTheDocument()
		expect(screen.getByRole("radio")).toHaveAttribute('id', "radio-1")
		expect(screen.getByRole("radio")).toHaveAttribute('data-test', "47")
	})
	
	test("fire handler on change as passed", async () => {
		const handleChange = jest.fn()
		const { container } = render(
			<Radio onChange={handleChange} />
		)
		const radio = container.firstChild
		fireEvent.click(radio)
		expect(handleChange).toHaveBeenCalledTimes(1)
		expect(radio.checked).toBe(true)
	})
})