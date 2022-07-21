import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { RadioRow } from "./index"

describe("RadioRow", () => {
	
	test("renders a radio row", async () => {
		render(<RadioRow data-testid="radio-row" />)
		expect(screen.getByTestId("radio-row")).toBeInTheDocument()
	})
	
	test("renders a radio row with a value as passed", async () => {
		render(<RadioRow value="radio-12" />)
		expect(screen.getByRole("radio")).toBeInTheDocument()
		expect(screen.getByRole("radio")).toHaveAttribute("value", 'radio-12')
	})
	
	test("renders a checked radio as passed", async () => {
		render(<RadioRow checked />)
		expect(screen.getByRole("radio")).toBeInTheDocument()
		expect(screen.getByRole("radio")).toBeChecked()
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
	
	test("renders a helpt text with a link as passed", async () => {
		render(<RadioRow helptext={<a href="#">Link</a>} />)
		expect(screen.getByRole("link")).toBeInTheDocument()
		expect(screen.getByRole("link")).toHaveAttribute("href", "#")
		expect(screen.getByRole("link")).toHaveTextContent("Link")
	  })
	
	test("renders a disabled radio as passed", async () => {
		render(<RadioRow disabled />)
		expect(screen.getByRole("radio")).toBeDisabled()
	})
	
	test("renders a custom className to the parent", async () => {
		render(<RadioRow data-testid="radio-row" className="my-class" />)
		expect(screen.getByTestId("radio-row")).toBeInTheDocument()
		expect(screen.getByTestId("radio-row")).toHaveClass("my-class")
	})
	
	test("renders all props as passed", async () => {
		render(<RadioRow data-testid="radio-row" data-lolol="random-prop" />)
		expect(screen.getByTestId("radio-row")).toBeInTheDocument()
		expect(screen.getByTestId("radio-row")).toHaveAttribute("data-lolol", 'random-prop')
	})
	
	test("fire handler on change as passed", async () => {
		const onChangeSpy = jest.fn();
		render(<RadioRow onChange={onChangeSpy} />);
		screen.getByRole('radio').click();
		expect(onChangeSpy).toHaveBeenCalled();
	})
	
})