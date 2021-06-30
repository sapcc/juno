import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { SwitchGroup } from "./index"

describe("CheckboxGroup", () => {
	
	
	test("renders a switch group", async () => {
		render(<SwitchGroup data-testid="switch-group" />)
		expect(screen.getByTestId("switch-group")).toBeInTheDocument()
	})
	
	test("renders a switch group with a checkbox and an associated label with an id as passed", async () => {
		render(<SwitchGroup data-testid="my-switch-group" label="My Switch Group" id="switch-group" />)
		expect(screen.getByRole("switch")).toBeInTheDocument()
		expect(screen.getByLabelText("My Switch Group")).toBeInTheDocument()
		expect(screen.getByRole("switch")).toHaveAttribute("id", 'switch-group')
	})
	
	test("renders a help text as passed", async () => {
		render(<SwitchGroup helptext="Helptext goes here" />)
		expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
	})

	
})