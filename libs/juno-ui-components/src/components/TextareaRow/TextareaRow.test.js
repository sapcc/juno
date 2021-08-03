import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { TextareaRow } from "./index"


describe("TextInputRow", () => {
	
	test("renders a textarea row", async () => {
		render(<TextareaRow data-testid="textarea-row" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
	})
	
	test("renders a textarea row with a textarea and an associated label with an id as passed", async () => {
		render(<TextareaRow data-testid="textarea-row" label="My Textarea Row" id="text-area-row" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByLabelText("My Textarea Row")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute("id", 'text-area-row')
	})
	
	test("renders a help text as passed", async () => {
		render(<TextareaRow helptext="Helptext goes here" />)
		expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
	})
	
	test("renders a required label as passed", async () => {
		render(<TextareaRow label="Required Input" required />)
		expect(document.querySelector('.required')).toBeInTheDocument()
	})
	
	test("renders a className to the Textarea as passed", async () => {
		render(<TextareaRow className="my-custom-class" />)
		expect(screen.getByRole("textbox")).toHaveClass("my-custom-class")
	})
	
	test("fires onChange handler as passed", async () => {
		const handleChange = jest.fn()
		render(<TextareaRow onChange={handleChange} />)
		const textarea = screen.getByRole("textbox")
		fireEvent.change(textarea, { target: { value: 'a' } })
		expect(handleChange).toHaveBeenCalledTimes(1)
	})
})