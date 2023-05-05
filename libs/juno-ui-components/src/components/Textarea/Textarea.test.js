import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Textarea } from "./index"


describe("Textarea", () => {
	
	test("renders a native html textarea", async () => {
		render(<Textarea />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
	})
	
	test("renders a name as passed", async () => {
		render(<Textarea name="my-textarea"/>)
		expect(screen.getByRole("textbox")).toHaveAttribute('name', "my-textarea")
	})
	
	test("renders text content as passed", async () => {
		render(<Textarea value="Test some text" />)
		expect(screen.getByRole("textbox")).toHaveTextContent("Test some text")
	})
	
	test("renders a label as passed", async () => {
		render(<Textarea label="The Label" id="my-textarea"/>)
		// implicitly test whether the textarea element can be selected via the labels text:
		expect(screen.getByLabelText("The Label")).toBeInTheDocument()
		expect(document.querySelector(".juno-label")).toBeInTheDocument()
		expect(document.querySelector(".juno-label")).toHaveTextContent("The Label")
	})
	
	test("renders a Textarea with an id as passed", async () => {
		render(<Textarea id="my-textinput" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute('id', "my-textinput")
	})
	
	test("renders an invalid textarea as passed", async () => {
		render(<Textarea invalid />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveClass("juno-textarea-invalid")
	})
	
	test("renders a valid textarea as passed", async () => {
		render(<Textarea valid />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveClass("juno-textarea-valid")
	})
	
	test("renders a placeholder as passed", async () => {
		render(<Textarea placeholder="My placeholder" />)
		expect(screen.getByRole("textbox")).toHaveAttribute('placeholder', "My placeholder")
	})
	
	test("renders a disabled textarea as passed", async () => {
		render(<Textarea disabled />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toBeDisabled()
	})
	
	test("renders a placeholder as passed", async () => {
		render(<Textarea placeholder="my placeholder"/>)
		expect(screen.getByRole("textbox")).toHaveAttribute('placeholder', "my placeholder")
	})
	
	test("renders autocomplete on as passed", async () => {
		render(<Textarea autoComplete="on"/>)
		expect(screen.getByRole("textbox")).toHaveAttribute('autocomplete', "on")
	})
	
	test("renders autofocus as passed", async () => {
		render(<Textarea autoFocus />)
		expect(screen.getByRole("textbox")).toHaveFocus()
	})
	
	test("renders a className as passed", async () => {
		render(<Textarea className="my-custom-class" />)
		expect(screen.getByRole("textbox")).toHaveClass("my-custom-class")
	})
	
	test("fires onChange handler as passed", async () => {
		const handleChange = jest.fn()
		const { container } = render(
			<Textarea onChange={handleChange} />
		)
		const textarea = screen.getByRole("textbox")
		fireEvent.change(textarea, { target: { value: 'a' } })
		expect(handleChange).toHaveBeenCalledTimes(1)
	})
	
	test("renders other props as passed", async () => {
		render(<Textarea cols="100" rows="25" minLength="0" maxLength="100"/>)
		expect(screen.getByRole("textbox")).toHaveAttribute('cols', "100")
		expect(screen.getByRole("textbox")).toHaveAttribute('rows', "25")
		expect(screen.getByRole("textbox")).toHaveAttribute('minlength', "0")
		expect(screen.getByRole("textbox")).toHaveAttribute('maxlength', "100")
	})
	
	test("does not fire onChange handler when disabled", async () => {
		const onChangeSpy = jest.fn();
		const { container } = render(
				<Textarea onChange={onChangeSpy} disabled />
			)
		screen.getByRole('textbox').click();
		expect(onChangeSpy).not.toHaveBeenCalled();	
	})

})