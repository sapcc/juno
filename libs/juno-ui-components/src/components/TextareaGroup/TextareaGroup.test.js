import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { TextareaGroup } from "./index"


describe("TextInputGroup", () => {
	
	test("renders a textarea input group", async () => {
		render(<TextareaGroup data-testid="textarea-group" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
	})
	
	test("renders a textarea group with a textarea and an associated label with an id as passed", async () => {
		render(<TextareaGroup data-testid="textarea-group" label="My Textarea Group" id="text-area-group" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByLabelText("My Textarea Group")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute("id", 'text-area-group')
	})
	
	test("renders a horizontal textarea group as passed", async () => {
		render(<TextareaGroup data-testid="textarea-group" layout="horizontal" />)
		expect(screen.getByTestId("textarea-group")).toHaveClass("textareagroup-horizontal")
	})
	
	test("renders a vertical textarea group as passed", async () => {
		render(<TextareaGroup data-testid="textarea-group" layout="vertical" />)
		expect(screen.getByTestId("textarea-group")).toHaveClass("textareagroup-vertical")
	})
	
	test("renders a horizontal text input group per default", async () => {
		render(<TextareaGroup data-testid="textarea-group" />)
		expect(screen.getByTestId("textarea-group")).toHaveClass("textareagroup-horizontal")
	})
	
	test("renders a help text as passed", async () => {
		render(<TextareaGroup helptext="Helptext goes here" />)
		expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
	})
	
	test("fires onChange handler as passed", async () => {
		const handleChange = jest.fn()
		render(<TextareaGroup onChange={handleChange} />)
		const textarea = screen.getByRole("textbox")
		fireEvent.change(textarea, { target: { value: 'a' } })
		expect(handleChange).toHaveBeenCalledTimes(1)
	})
})