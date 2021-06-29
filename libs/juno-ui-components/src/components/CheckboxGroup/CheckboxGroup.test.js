import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { CheckboxGroup } from "./index"

describe("CheckboxGroup", () => {
	
	
	test("renders a checkbox group", async () => {
		render(<CheckboxGroup data-testid="checkbox-group" />)
		expect(screen.getByTestId("checkbox-group")).toBeInTheDocument()
	})
	
	test("renders a checkbox group with a checkbox and an associated label with an id as passed", async () => {
		render(<CheckboxGroup data-testid="my-checkbox-group" label="My Checkbox Group" id="checkbox-group" />)
		expect(screen.getByRole("checkbox")).toBeInTheDocument()
		expect(screen.getByLabelText("My Checkbox Group")).toBeInTheDocument()
		expect(screen.getByRole("checkbox")).toHaveAttribute("id", 'checkbox-group')
	})
	
	test("renders a horizontal checkbox group as passed", async () => {
		render(<CheckboxGroup data-testid="my-checkbox-group" layout="horizontal" />)
		expect(screen.getByTestId("my-checkbox-group")).toHaveClass("checkboxgroup-horizontal")
	})
	
	test("renders a vertical checkbox group as passed", async () => {
		render(<CheckboxGroup data-testid="my-checkbox-group" layout="vertical" />)
		expect(screen.getByTestId("my-checkbox-group")).toHaveClass("checkboxgroup-vertical")
	})
	
	test("renders a horizontal checkbox group per default", async () => {
		render(<CheckboxGroup data-testid="my-checkbox-group" />)
		expect(screen.getByTestId("my-checkbox-group")).toHaveClass("checkboxgroup-horizontal")
	})
	
	test("renders a help text as passed", async () => {
		render(<CheckboxGroup helptext="Helptext goes here" />)
		expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
	})
	
	// test("fires onChange handler as passed", async () => {
	// 	const handleChange = jest.fn()
	// 	render(<CheckboxGroup onChange={handleChange} />)
	// 	const checkbox = screen.getByRole("checkbox")
	// 	fireEvent.change(checkbox, { target: { value: 'a' } })
	// 	expect(handleChange).toHaveBeenCalledTimes(1)
	// })
	
})