import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { SelectRow } from "./index"


describe("SelectRow", () => {
	
	test("renders a select row", async () => {
		render(<SelectRow data-testid="select-row" />)
		expect(screen.getByTestId("select-row")).toBeInTheDocument()
	})
	
	test("renders a select row with a select and an associated label with an id as passed", async () => {
		render(<SelectRow data-testid="select-row" label="my-select" id="select-row" />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByLabelText("my-select")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveAttribute("id", 'select-row')
	})
	
	test("renders a help text as passed", async () => {
		render(<SelectRow helptext="Helptext goes here" />)
		expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
	})
	
	test("renders a required label as passed", async () => {
		render(<SelectRow label="Required Input" required />)
		expect(document.querySelector('.required')).toBeInTheDocument()
	})
	
	test("renders a custom class to select as passed", async () => {
		render(<SelectRow className="my-custom-class" />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveClass("my-custom-class")
	})
	
	test("fires onChange handler as passed", async () => {
		const handleChange = jest.fn()
		render(<SelectRow onChange={handleChange} />)
		const slct = screen.getByRole("combobox")
		fireEvent.change(slct, { target: { value: 'a' } })
		expect(handleChange).toHaveBeenCalledTimes(1)
	})
	
})