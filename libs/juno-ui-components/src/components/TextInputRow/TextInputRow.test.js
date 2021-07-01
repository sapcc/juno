import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { TextInputRow } from "./index"


describe("TextInputGroup", () => {
	
	test("renders a text input row", async () => {
		render(<TextInputRow data-testid="text-input-row" />)
		expect(screen.getByTestId("text-input-row")).toBeInTheDocument()
	})
	
	test("renders a text input row with a text input and an associated label with an id as passed", async () => {
		render(<TextInputRow data-testid="text-input-row" label="my-text-input" id="text-input-row" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByLabelText("my-text-input")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute("id", 'text-input-row')
	})
	
	test("renders a horizontal text input row as passed", async () => {
		render(<TextInputRow data-testid="text-input-row" layout="horizontal" />)
		expect(screen.getByTestId("text-input-row")).toHaveClass("textinputrow-horizontal")
	})
	
	test("renders a vertical text input row as passed", async () => {
		render(<TextInputRow data-testid="text-input-row" layout="vertical" />)
		expect(screen.getByTestId("text-input-row")).toHaveClass("textinputrow-vertical")
	})
	
	test("renders a horizontal text input group per default", async () => {
		render(<TextInputRow data-testid="text-input-row" />)
		expect(screen.getByTestId("text-input-row")).toHaveClass("textinputrow-horizontal")
	})
	
	test("renders a help text as passed", async () => {
		render(<TextInputRow helptext="Helptext goes here" />)
		expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
	})
	
	test("fires onChange handler as passed", async () => {
		const handleChange = jest.fn()
		render(<TextInputRow onChange={handleChange} />)
		const input = screen.getByRole("textbox")
		fireEvent.change(input, { target: { value: 'a' } })
		expect(handleChange).toHaveBeenCalledTimes(1)
	})
})