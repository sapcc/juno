import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { RadioRow } from "./index"

describe("RadioRow", () => {
	
	
	test("renders a radio row", async () => {
		render(<RadioRow data-testid="radio-row" />)
		expect(screen.getByTestId("radio-row")).toBeInTheDocument()
	})
	
	test("renders a radio group with a radio and an associated label with an id as passed", async () => {
		render(<RadioRow data-testid="my-radio-row" label="My Radio Row" id="radio-row" />)
		expect(screen.getByRole("radio")).toBeInTheDocument()
		expect(screen.getByLabelText("My Radio Row")).toBeInTheDocument()
		expect(screen.getByRole("radio")).toHaveAttribute("id", 'radio-row')
	})
	
	test("renders a help text as passed", async () => {
		render(<RadioRow helptext="Helptext goes here" />)
		expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
	})
	
	// test("renders a className to radio element as passed", async () => {
	// 	render(<RadioRow className="my-custom-class" />)
	// 	expect(screen.getByRole("radio")).toHaveClass("my-custom-class")
	// })
	
})