import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Checkbox } from "./index"


describe("Checkbox", () => {
	
	test("renders a valid html input type checkbox", async () => {
		render(<Checkbox />)
		expect(screen.getByRole("checkbox")).toBeInTheDocument()
		expect(screen.getByRole("checkbox")).toHaveAttribute('type', "checkbox")
	})
	
	test("renders a checkbox with a name as passed", async () => {
		render(<Checkbox name="My Checkbox" />)
		expect(screen.getByRole("checkbox")).toBeInTheDocument()
		expect(screen.getByRole("checkbox")).toHaveAttribute('name', "My Checkbox")
	})
	
	test("renders a checkbox with a value as passed", async () => {
		render(<Checkbox value="ValueAsPassed" />)
		expect(screen.getByRole("checkbox")).toBeInTheDocument()
		expect(screen.getByRole("checkbox")).toHaveAttribute('value', "ValueAsPassed")
	})
	
	test("renders a checked checkbox as passed", async () => {
		render(<Checkbox checked={true} />)
		const checkbox = screen.getByRole('checkbox')
		expect(checkbox).toBeInTheDocument()
		expect(checkbox).toBeChecked()
	})
	
	test("renders no checked attribute if false", async () => {
		render(<Checkbox checked={false} />)
		const checkbox = screen.getByRole('checkbox')
		expect(checkbox).toBeInTheDocument()
		expect(checkbox).not.toBeChecked()
	})
	
	test("renders a custom className as passed", async () => {
		render(<Checkbox data-testid="23" className="my-custom-classname" />)
		expect(screen.getByTestId("23")).toBeInTheDocument()
		expect(screen.getByTestId("23")).toHaveClass('my-custom-classname')
	})
	
	test("renders all props as passed", async () => {
		render(<Checkbox id="check-1" data-testid="23" data-lolol={true}/>)
		expect(screen.getByTestId("23")).toBeInTheDocument()
		expect(screen.getByTestId("23")).toHaveAttribute('data-lolol')
	})
	
	test("renders a disabled checkbox as passed", async () => {
		render(<Checkbox disabled />)
		const checkbox = screen.getByRole('checkbox')
		expect(checkbox).toBeInTheDocument()
		expect(checkbox).toBeDisabled()
	})
	
	test("fires handler on change as passed", async () => {	
		const onChangeSpy = jest.fn();
		render(<Checkbox onChange={onChangeSpy} />);
		screen.getByRole('checkbox').click();
		expect(onChangeSpy).toHaveBeenCalled();	
	})

})