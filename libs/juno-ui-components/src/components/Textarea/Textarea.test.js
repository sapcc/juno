import * as React from "react"
import { render, screen } from "@testing-library/react"
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
	
	test("renders a placeholder as passed", async () => {
		render(<Textarea placeholder="My placeholder" />)
		expect(screen.getByRole("textbox")).toHaveAttribute('placeholder', "My placeholder")
	})
	
	test("renders a disabled textarea as passed", async () => {
		render(<Textarea disabled />)
		expect(screen.getByRole("textbox")).toHaveAttribute('disabled')
	})

})