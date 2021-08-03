import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { SwitchRow } from "./index"

describe("SwitchRow", () => {
	
	
	test("renders a switch row", async () => {
		render(<SwitchRow data-testid="switch-row" />)
		expect(screen.getByTestId("switch-row")).toBeInTheDocument()
	})
	
	test("renders a switch row with a checkbox and an associated label with an id as passed", async () => {
		render(<SwitchRow data-testid="my-switch-row" label="My Switch Row" id="switch-row" />)
		expect(screen.getByRole("switch")).toBeInTheDocument()
		expect(screen.getByLabelText("My Switch Row")).toBeInTheDocument()
		expect(screen.getByRole("switch")).toHaveAttribute("id", 'switch-row')
	})
	
	test("renders a help text as passed", async () => {
		render(<SwitchRow helptext="Helptext goes here" />)
		expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
	})
	
	test("renders a required label as passed", async () => {
		render(<SwitchRow label="Required Input" required />)
		expect(document.querySelector('.required')).toBeInTheDocument()
	})
	
	test("renders a custom className to the Switch as passed", async () => {
		render(<SwitchRow className="my-custom-class" />)
		expect(screen.getByRole("switch")).toBeInTheDocument()
		expect(screen.getByRole("switch")).toHaveClass("my-custom-class")
	})

	
})