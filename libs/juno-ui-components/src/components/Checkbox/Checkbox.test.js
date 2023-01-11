import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { act } from 'react-dom/test-utils';
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
	
	test("renders a checkbox with an id as passed", async () => {
		render(<Checkbox id="my-checkbox" />)
		expect(screen.getByRole("checkbox")).toBeInTheDocument()
		expect(screen.getByRole("checkbox")).toHaveAttribute('id', "my-checkbox")
	})
	
	test("renders a checkbox with a value as passed", async () => {
		render(<Checkbox value="ValueAsPassed" />)
		expect(screen.getByRole("checkbox")).toBeInTheDocument()
		expect(screen.getByRole("checkbox")).toHaveAttribute('value', "ValueAsPassed")
	})
	
	test("renders a checked checkbox as passed", async () => {
		act(() => {
			render(<Checkbox checked={true} />)
		})
		const checkbox = screen.getByRole('checkbox')
		expect(checkbox).toBeInTheDocument()
		expect(checkbox).toBeChecked()
	})
	
	test("renders no checked attribute if false", async () => {
		act(() => {
			render(<Checkbox checked={false} />)
		})
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
	
	test("renders an invalid Checkbox as passed", async () => {
		render(<Checkbox invalid />)
		expect(screen.getByRole("checkbox")).toBeInTheDocument()
		expect(screen.getByRole("checkbox")).toHaveClass("juno-checkbox-invalid")
	})
	
	test("renders a valid Checkbox as passed", async () => {
		render(<Checkbox valid />)
		expect(screen.getByRole("checkbox")).toBeInTheDocument()
		expect(screen.getByRole("checkbox")).toHaveClass("juno-checkbox-valid")
	})
	
	test("fires handler on change as passed", async () => {	
		const onChangeSpy = jest.fn();
		render(<Checkbox onChange={onChangeSpy} />);
		act(() => {
			screen.getByRole('checkbox').click();
		})
		expect(onChangeSpy).toHaveBeenCalled();	
	})
	
	test("fires handler on click as passed", async () => {	
		const onClickSpy = jest.fn();
		render(<Checkbox onClick={onClickSpy} />);
		act(() => {
			screen.getByRole('checkbox').click();
		})
		expect(onClickSpy).toHaveBeenCalled();	
	})
	
	test("does not fire a handler on change when disabled", async () => {	
		const onChangeSpy = jest.fn();
		render(<Checkbox onChange={onChangeSpy} disabled />);
		act(() => {
			screen.getByRole('checkbox').click();
		})
		expect(onChangeSpy).not.toHaveBeenCalled();	
	})
	
	test("does not fire a handler on click when disabled", async () => {	
		const onClickSpy = jest.fn();
		render(<Checkbox onClick={onClickSpy} disabled />);
		act(() => {
			screen.getByRole('checkbox').click();
		})
		expect(onClickSpy).not.toHaveBeenCalled();	
	})

})