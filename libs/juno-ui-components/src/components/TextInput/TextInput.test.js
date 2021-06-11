


import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { TextInput } from "./index"


describe("TextInputo", () => {
	
	test("renders a valid html default text input with no type attribute", async () => {
		render(<TextInput />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).not.toHaveAttribute('type')
	})
	
	test("renders a text input with a name as passed", async () => {
		render(<TextInput name="My TextInput" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute('name', "My TextInput")
	})
	
	test("renders a text input with a value as passed", async () => {
		render(<TextInput value="Some kind of value" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute('value', "Some kind of value")
	})
	
	// resort to using a testId since <input type=""password" has no accessible wai-aria role:
	test("renders a password input as passed", async () => {
		render(<TextInput type="password" data-testid="pw"/>)
		expect(screen.getByTestId("pw")).toBeInTheDocument()
		expect(screen.getByTestId("pw")).toHaveAttribute('type', "password")
	})
	
	test("renders an email input as passed", async () => {
		render(<TextInput type="email" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute('type', "email")
	})
	
	test("renders a telephone number input as passed", async () => {
		render(<TextInput type="tel" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute('type', "tel")
	})
	
	test("renders an url input as passed", async () => {
		render(<TextInput type="url" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute('type', "url")
	})
	
	test("renders a disabled input as passed", async () => {
		render(<TextInput disabled />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute('disabled')
	})
	
	test("renders a readonly input as passed", async () => {
		render(<TextInput readOnly />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute('readonly')
	})
	
	test("renders other props as passed", async () => {
		render(<TextInput placeholder="My placeholder" />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
		expect(screen.getByRole("textbox")).toHaveAttribute('placeholder', "My placeholder")
	})

	test("fires onChange handler as passed", async () => {
		const handleChange = jest.fn()
		const { container } = render(
			<TextInput onChange={handleChange} />
		)
		const textinput = container.firstChild
		fireEvent.change(textinput, { target: { value: 'a' } })
		expect(handleChange).toHaveBeenCalledTimes(1)
	})
	
})