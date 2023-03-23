import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SelectRow } from "./index"
import { SelectOption } from "../SelectOption/index"


describe("SelectRow", () => {
	
	test("renders a select row", async () => {
		render(<SelectRow data-testid="select-row" />)
		expect(screen.getByTestId("select-row")).toBeInTheDocument()
	})
	
	test("renders a select row with a select and an associated label with an id as passed", async () => {
		render(<SelectRow data-testid="select-row" label="my-select" id="select-row" />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByLabelText("my-select")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveAttribute("id", 'select-row')
	})
	
	test("renders a help text as passed", async () => {
		render(<SelectRow helptext="Helptext goes here" />)
		expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
	})
	
	test("renders a helpt text with a link as passed", async () => {
		render(<SelectRow helptext={<a href="#">Link</a>} />)
		expect(screen.getByRole("link")).toBeInTheDocument()
		expect(screen.getByRole("link")).toHaveAttribute("href", "#")
		expect(screen.getByRole("link")).toHaveTextContent("Link")
	  })
	
	test("renders a required label as passed", async () => {
		render(<SelectRow label="Required Input" required />)
		expect(document.querySelector('.required')).toBeInTheDocument()
	})
	
	test("renders a custom class to the row as passed", async () => {
		render(<SelectRow data-testid="select-row" className="my-custom-class" />)
		expect(screen.getByTestId("select-row")).toBeInTheDocument()
		expect(screen.getByTestId("select-row")).toHaveClass("my-custom-class")
	})
	
	test("renders a disabled select as passed", async () => {
		render(<SelectRow disabled />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toBeDisabled()
	})
	
	test("renders an invalid SelectRow as passed", async () => {
		render(<SelectRow invalid />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveClass("juno-select-invalid")
		expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
	})
	
	test("renders an invalid SelectRow when errortext prop was passed", async () => {
		render(<SelectRow errortext="This is an error text" />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveClass("juno-select-invalid")
		expect(screen.getByText("This is an error text")).toBeInTheDocument()
	})
	
	test("renders a valid SelectRow as passed", async () => {
		render(<SelectRow valid />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveClass("juno-select-valid")
		expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
	})
	
	test("renders a valid SelectRow when successtext prop was passed", async () => {
		render(<SelectRow successtext="This is a success text" />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveClass("juno-select-valid")
		expect(screen.getByText("This is a success text")).toBeInTheDocument()
	})
	
	test("renders a floating variant select row by default", async () => {
		render(<SelectRow data-testid="select-row" />)
		expect(screen.getByTestId("select-row")).toBeInTheDocument()
		expect(screen.getByTestId("select-row")).toHaveClass("juno-select-row-floating")
	})
	
	test("renders a stacked variant select row as passed", async () => {
		render(<SelectRow data-testid="select-row" variant="stacked" />)
		expect(screen.getByTestId("select-row")).toBeInTheDocument()
		expect(screen.getByTestId("select-row")).toHaveClass("juno-select-row-stacked")
	})
	
	test("renders all props as passed", async () => {
		render(<SelectRow data-testid="select-row" data-lolol="some-prop" />)
		expect(screen.getByTestId("select-row")).toBeInTheDocument()
		expect(screen.getByTestId("select-row")).toHaveAttribute("data-lolol", 'some-prop')
	})
	
	test.skip("fires onChange handler as passed", async () => {
		const handleChange = jest.fn()
		render(
			<SelectRow onChange={handleChange}>
				<SelectOption value="v-1" label="Value 1" />
				<SelectOption value="v-2" label="Value 2"/>
			</SelectRow>
		)
		await userEvent.selectOptions(
			// Find the select element
			screen.getByRole('combobox'),
			// Find and select the Value 2 option
			screen.getByRole('option', {name: 'Value 2'}),
		)
		expect(handleChange).toHaveBeenCalledTimes(1)
	})

	test.skip('allows user to change options', async () => {
		render(
			<SelectRow>
				<SelectOption value="v-1" label="Value 1" />
				<SelectOption value="v-2" label="Value 2"/>
			</SelectRow>
		)
		await userEvent.selectOptions(
			// Find the select element
			screen.getByRole('combobox'),
			// Find and select the Value 2 option
			screen.getByRole('option', {name: 'Value 2'}),
		)
		expect(screen.getByRole('option', {name: 'Value 2'}).selected).toBe(true)
	})

	test.skip('correctly sets uncontrolled default option', () => {
		render(
			<SelectRow defaultValue="v-2">
				<SelectOption value="v-1" label="Value 1" />
				<SelectOption value="v-2" label="Value 2"/>
			</SelectRow>
		)
		expect(screen.getByRole('option', {name: 'Value 1'}).selected).toBe(false)
		expect(screen.getByRole('option', {name: 'Value 2'}).selected).toBe(true)
	})

	test.skip('correctly sets controlled default option', () => {
		render(
			<SelectRow value="v-2">
				<SelectOption value="v-1" label="Value 1" />
				<SelectOption value="v-2" label="Value 2"/>
			</SelectRow>
		)
		expect(screen.getByRole('option', {name: 'Value 1'}).selected).toBe(false)
		expect(screen.getByRole('option', {name: 'Value 2'}).selected).toBe(true)
	})


	
})