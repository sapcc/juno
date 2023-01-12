import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { act } from 'react-dom/test-utils'
import { Radio } from "./index"


describe("Radio", () => {
	
	test("renders an html input type radio", async () => {
		render(<Radio />)
		expect(screen.getByRole("radio")).toBeInTheDocument()
		expect(screen.getByRole("radio")).toHaveAttribute('type', "radio")
	})
	
	test("renders a radio with a name as passed", async () => {
		render(<Radio name="My Radio" />)
		expect(screen.getByRole("radio")).toBeInTheDocument()
		expect(screen.getByRole("radio")).toHaveAttribute('name', "My Radio")
	})
	
	test("renders a radio with an id as passed", async () => {
		render(<Radio id="my-radio" />)
		expect(screen.getByRole("radio")).toBeInTheDocument()
		expect(screen.getByRole("radio")).toHaveAttribute('id', "my-radio")
	})
	
	test("renders a radio with a value as passed", async () => {
		render(<Radio value="ValueAsPassed" />)
		expect(screen.getByRole("radio")).toBeInTheDocument()
		expect(screen.getByRole("radio")).toHaveAttribute('value', "ValueAsPassed")
	})
	
	test("renders a checked radio as passed", async () => {
		act(() => {
			render(<Radio checked={true} />)
		})
		const radio = screen.getByRole('radio')
		expect(radio).toBeInTheDocument()
		expect(radio).toBeChecked()
	})
	
	test("renders no checked attribute if false", async () => {
		act(() => {
			render(<Radio checked={false} />)
		})
		const radio = screen.getByRole('radio')
		expect(radio).toBeInTheDocument()
		expect(radio).not.toBeChecked()
	})
	
	test("renders a custom className as passed", async () => {
		render(<Radio data-testid="23" className="my-custom-class" />)
		expect(screen.getByTestId("23")).toBeInTheDocument()
		expect(screen.getByTestId("23")).toHaveClass('my-custom-class')
	})
	
	test("renders all props as passed", async () => {
		render(<Radio id="check-1" data-testid="23" data-lolol={true}/>)
		expect(screen.getByTestId("23")).toBeInTheDocument()
		expect(screen.getByTestId("23")).toHaveAttribute('data-lolol')
	})
	
	test("renders a disabled radio as passed", async () => {
		render(<Radio disabled />)
		const radio = screen.getByRole('radio')
		expect(radio).toBeInTheDocument()
		expect(radio).toBeDisabled()
	})
	
	test("renders an invalid radio as passed", async () => {
		render(<Radio invalid />)
		const radio = screen.getByRole('radio')
		expect(radio).toBeInTheDocument()
		expect(radio).toHaveClass("juno-radio-invalid")
	})
	
	test("renders a valid Radio as passed", async () => {
		render(<Radio valid />)
		const radio = screen.getByRole('radio')
		expect(radio).toBeInTheDocument()
		expect(radio).toHaveClass("juno-radio-valid")
	})
	
	test("fires handler on change as passed", async () => {
		const onChangeSpy = jest.fn();
		render(<Radio onChange={onChangeSpy} />);
		act(() => {
			screen.getByRole('radio').click();
		})
		expect(onChangeSpy).toHaveBeenCalled();
	})
	
	test("fires handler on click as passed", async () => {
		const onClickSpy = jest.fn();
		render(<Radio onClick={onClickSpy} />);
		act(() => {
			screen.getByRole('radio').click();
		})
		expect(onClickSpy).toHaveBeenCalled();
	})
	
	test("does not fire onChange handler when disabled", async () => {
		const onChangeSpy = jest.fn()
		render(<Radio onChange={onChangeSpy} disabled />)
		act(() => {
			screen.getByRole('radio').click();
		})
		expect(onChangeSpy).not.toHaveBeenCalled()
	})
	
	test("does not fire onClick handler when disabled", async () => {
		const onClickSpy = jest.fn()
		render(<Radio onClick={onClickSpy} disabled />)
		act(() => {
			screen.getByRole('radio').click();
		})
		expect(onClickSpy).not.toHaveBeenCalled()
	})
	
})