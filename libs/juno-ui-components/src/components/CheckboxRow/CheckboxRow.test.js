import * as React from "react"
import { render, screen } from "@testing-library/react"
import { CheckboxRow } from "./index"

describe("CheckboxRow", () => {
	
	
	test("renders a checkbox row", async () => {
		render(<CheckboxRow data-testid="checkbox-row" />)
		expect(screen.getByTestId("checkbox-row")).toBeInTheDocument()
	})
	
	test("renders a checkbox group with a checkbox and an associated label with an id as passed", async () => {
		render(<CheckboxRow data-testid="my-checkbox-row" label="My Checkbox Row" id="checkbox-row" />)
		expect(screen.getByRole("checkbox")).toBeInTheDocument()
		expect(screen.getByLabelText("My Checkbox Row")).toBeInTheDocument()
		expect(screen.getByRole("checkbox")).toHaveAttribute("id", 'checkbox-row')
	})
	
	test("renders a help text as passed", async () => {
		render(<CheckboxRow helptext="Helptext goes here" />)
		expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
	})
	
	test("renders a required label as passed", async () => {
		render(<CheckboxRow label="Required Input" required />)
		expect(document.querySelector('.required')).toBeInTheDocument()
	})
	
	// test("renders a custom className on the checkbox as passed", async () => {
	// 	render(<CheckboxRow className="my-custom-classname" />)
	// 	expect(screen.getByRole("checkbox")).toBeInTheDocument()
	// 	expect(screen.getByRole("checkbox")).toHaveClass("my-custom-classname")
	// })
	
})