import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { SwitchRow } from "./index"

describe("SwitchRow", () => {
	
	
	test("renders a switch row", async () => {
		render(<SwitchRow data-testid="switch-row" />)
		expect(screen.getByTestId("switch-row")).toBeInTheDocument()
	})
	
	test("renders a switch row with a name as passed", async () => {
		render(<SwitchRow data-testid="switch-row" name="my-switch" />)
		expect(screen.getByTestId("switch-row")).toBeInTheDocument()
		expect(screen.getByRole("switch")).toBeInTheDocument()
		expect(screen.getByRole("switch")).toHaveAttribute("name", 'my-switch')
	})
	
	test("renders a switch row with a switch button and an associated label with an id as passed", async () => {
		render(<SwitchRow data-testid="my-switch-row" label="My Switch Row" id="switch-row" />)
		expect(screen.getByRole("switch")).toBeInTheDocument()
		expect(screen.getByLabelText("My Switch Row")).toBeInTheDocument()
		expect(screen.getByRole("switch")).toHaveAttribute("id", 'switch-row')
	})
	
	test("renders a help text as passed", async () => {
		render(<SwitchRow helptext="Helptext goes here" />)
		expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
	})
	
	test("renders a helpt text with a link as passed", async () => {
		render(<SwitchRow helptext={<a href="#">Link</a>} />)
		expect(screen.getByRole("link")).toBeInTheDocument()
		expect(screen.getByRole("link")).toHaveAttribute("href", "#")
		expect(screen.getByRole("link")).toHaveTextContent("Link")
	  })
	
	test("renders a required label as passed", async () => {
		render(<SwitchRow label="Required Input" required />)
		expect(document.querySelector('.required')).toBeInTheDocument()
	})
	
	test("renders a disabled switch as passed", async () => {
		render(<SwitchRow disabled />)
		expect(screen.getByRole("switch")).toBeDisabled()
	})
	
	test("renders a custom className to the parent as passed", async () => {
		render(<SwitchRow data-testid="switch-row" className="my-custom-class" />)
		expect(screen.getByTestId("switch-row")).toBeInTheDocument()
		expect(screen.getByTestId("switch-row")).toHaveClass("my-custom-class")
	})
	
	test("renders all props as passed", async () => {
		render(<SwitchRow id="switchrow-1" data-test="47" data-testid="switch-row"/>)
		expect(screen.getByTestId("switch-row")).toBeInTheDocument()
		expect(screen.getByTestId("switch-row")).toHaveAttribute('data-test', "47")
	  })
	
	test("renders a Switch with aria-checked set to false by default", async () => {
		render(<SwitchRow />)
		expect(screen.getByRole("switch")).toBeInTheDocument()
		expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", 'false')
	})
	
	test("renders a Switch that is aria-checked if ON is passed", async () => {
		render(<SwitchRow on />)
		expect(screen.getByRole("switch")).toBeInTheDocument()
		expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", 'true')
	})
		
	test("executes custom handler on change as passed", async () => {	
		const onChangeSpy = jest.fn();
		render(<SwitchRow onChange={onChangeSpy} />);
		screen.getByRole('switch').click();
		expect(onChangeSpy).toHaveBeenCalled();	
	  })
	
})