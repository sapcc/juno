import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { TextInputGroup } from "./index"


describe("TextInputGroup", () => {
	
	test("renders a text input group", async () => {
		render(<TextInputGroup data-testid="text-input-group" />)
		expect(screen.getByTestId("text-input-group")).toBeInTheDocument()
	})
	
	test("renders a text input group with a text input and an associated label with an id as passed", async () => {
		render(<TextInputGroup data-testid="text-input-group" label="my-text-input" id="text-input-group" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByLabelText("my-text-input")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute("id", 'text-input-group')
	})
	
	test("renders a horizontal text input group as passed", async () => {
		render(<TextInputGroup data-testid="text-input-group" layout="horizontal" />)
		expect(screen.getByTestId("text-input-group")).toHaveClass("textinputgroup-horizontal")
	})
	
	test("renders a vertical text input group as passed", async () => {
		render(<TextInputGroup data-testid="text-input-group" layout="vertical" />)
		expect(screen.getByTestId("text-input-group")).toHaveClass("textinputgroup-vertical")
	})
	
	test("renders a help text as passed", async () => {
		render(<TextInputGroup helptext="Helptext goes here" />)
		expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
	})
})