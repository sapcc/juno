import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { SelectTextInputRow } from "./index"


describe("SelectTextInputRow", () => {
	
	test("renders a SelectTextInputRow", async () => {
		render(<SelectTextInputRow data-testid="select-textinput-row" />)
		expect(screen.getByTestId("select-textinput-row")).toBeInTheDocument()
	})
	
	// test("renders a select row with a select and an associated label with an id as passed", async () => {
	// 	render(<SelectRow data-testid="select-row" label="my-select" id="select-row" />)
	// 	expect(screen.getByRole("combobox")).toBeInTheDocument()
	// 	expect(screen.getByLabelText("my-select")).toBeInTheDocument()
	// 	expect(screen.getByRole("combobox")).toHaveAttribute("id", 'select-row')
	// })
	// 
	test("renders a help text as passed", async () => {
		render(<SelectTextInputRow helptext="Helptext goes here" />)
		expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
	})
	// 
	// test("renders a required label as passed", async () => {
	// 	render(<SelectRow label="Required Input" required />)
	// 	expect(document.querySelector('.required')).toBeInTheDocument()
	// })
	// 
	test("renders a custom class to the row as passed", async () => {
		render(<SelectTextInputRow data-testid="select-textinput-row" className="my-custom-class" />)
		expect(screen.getByTestId("select-textinput-row")).toBeInTheDocument()
		expect(screen.getByTestId("select-textinput-row")).toHaveClass("my-custom-class")
	})
	
	test("renders all props as passed", async () => {
		render(<SelectTextInputRow data-testid="select-textinput-row" data-lolol="some-prop" />)
		expect(screen.getByTestId("select-textinput-row")).toBeInTheDocument()
		expect(screen.getByTestId("select-textinput-row")).toHaveAttribute("data-lolol", 'some-prop')
	})

	
})