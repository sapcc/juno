import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Textarea } from "./index"


describe("Textarea", () => {
	
	test("renders a native html textarea", async () => {
		render(<Textarea />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
	})
	
	test("renders a name as passed", async () => {
		render(<Textarea name="my-textarea"/>)
		expect(screen.getByRole("textbox")).toHaveAttribute('name', "my-textarea")
	})
	
	test("renders text content as passed", async () => {
		render(<Textarea value="Test some text" />)
		expect(screen.getByRole("textbox")).toHaveTextContent("Test some text")
	})
	
	test("renders a placeholder as passed", async () => {
		render(<Textarea placeholder="My placeholder" />)
		expect(screen.getByRole("textbox")).toHaveAttribute('placeholder', "My placeholder")
	})
	
	test("renders a disabled textarea as passed", async () => {
		render(<Textarea disabled />)
		expect(screen.getByRole("textbox")).toHaveAttribute('disabled')
	})
	
	test("fires onChange handler as passed", async () => {
		const handleChange = jest.fn()
		const { container } = render(
			<Textarea onChange={handleChange} />
		)
		const textarea = container.firstChild
		fireEvent.change(textarea, { target: { value: 'a' } })
		expect(handleChange).toHaveBeenCalledTimes(1)
	})
	
	test("renders other props as passed", async () => {
		render(<Textarea autoComplete="on" cols="100" rows="25" minLength="0" maxLength="100"/>)
		expect(screen.getByRole("textbox")).toHaveAttribute('autocomplete', "on")
		expect(screen.getByRole("textbox")).toHaveAttribute('cols', "100")
		expect(screen.getByRole("textbox")).toHaveAttribute('rows', "25")
		expect(screen.getByRole("textbox")).toHaveAttribute('minlength', "0")
		expect(screen.getByRole("textbox")).toHaveAttribute('maxlength', "100")
	})

})