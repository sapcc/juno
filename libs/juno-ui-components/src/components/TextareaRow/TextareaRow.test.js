import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { TextareaRow } from "./index"


describe("TextInputRow", () => {
	
	test("renders a textarea row", async () => {
		render(<TextareaRow data-testid="textarea-row" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
	})
	
	test("renders a value as passed", async () => {
		render(<TextareaRow value="Some value in the textarea" />)
		expect(screen.getByText("Some value in the textarea")).toBeInTheDocument()
	})
	
	test("renders a name attribute as passed", async () => {
		render(<TextareaRow name="my-textarea-row" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute("name", 'my-textarea-row')
	})
	
	test("renders a textarea row with a textarea and an associated label with an id as passed", async () => {
		render(<TextareaRow data-testid="textarea-row" label="My Textarea Row" id="text-area-row" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByLabelText("My Textarea Row")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute("id", 'text-area-row')
	})
	
	test("redners a placeholder as passed", async () => {
		render(<TextareaRow placeholder="Some placeholder text" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", 'Some placeholder text')
	})
	
	test("renders a help text as passed", async () => {
		render(<TextareaRow helptext="Helptext goes here" />)
		expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
	})
	
	test("renders a required label as passed", async () => {
		render(<TextareaRow label="Required Textarea" required />)
		expect(document.querySelector('.required')).toBeInTheDocument()
	})
	
	test("renders a disabled textarea row as passed", async () => {
		render(<TextareaRow label="Disabled Textarea" disabled />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toBeDisabled()
	})
	
	test("renders a className to the row as passed", async () => {
		render(<TextareaRow data-testid="textarea-row" className="my-custom-class" />)
		expect(screen.getByTestId("textarea-row")).toHaveClass("my-custom-class")
	})
	
	test("renders all props to teh row as passed", async () => {
		render(<TextareaRow data-testid="textarea-row" data-lolol="some-props" />)
		expect(screen.getByTestId("textarea-row")).toHaveAttribute("data-lolol", 'some-props')
	})
	
	test("fires onChange handler as passed", async () => {
		const handleChange = jest.fn()
		render(<TextareaRow onChange={handleChange} />)
		const textarea = screen.getByRole("textbox")
		fireEvent.change(textarea, { target: { value: 'a' } })
		expect(handleChange).toHaveBeenCalledTimes(1)
	})
})