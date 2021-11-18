import * as React from "react"
import { render, screen} from "@testing-library/react"
import { SelectOption } from "./index"

describe("SelectOption", () => {
	
	test("renders an option element", async () => {
		render(<SelectOption />)
		expect(screen.getByRole("option")).toBeInTheDocument()
	})
	
	test("renders an option with a value as passed", async () => {
		render(<SelectOption value="49"/>)
		expect(screen.getByRole("option")).toBeInTheDocument()
		expect(screen.getByRole("option")).toHaveAttribute('value', "49")
	})
	
	test("renders an option with a label as passed", async () => {
		render(<SelectOption label="My first option"/>)
		expect(screen.getByRole("option")).toBeInTheDocument()
		expect(screen.getByRole("option")).toHaveTextContent("My first option")
	})
	
	test("renders a disabled option", async () => {
		render(<SelectOption disabled />)
		expect(screen.getByRole("option")).toBeInTheDocument()
		expect(screen.getByRole("option")).toBeDisabled()
	})
	
	test("renders a custom className", async () => {
		render(<SelectOption className="my-custom-classname" />)
		expect(screen.getByRole("option")).toBeInTheDocument()
		expect(screen.getByRole("option")).toHaveClass("my-custom-classname")
	})
	
	test("renders all props", async () => {
		render(<SelectOption data-lolol="some-prop" />)
		expect(screen.getByRole("option")).toBeInTheDocument()
		expect(screen.getByRole("option")).toHaveAttribute("data-lolol", 'some-prop')
	})
	
})