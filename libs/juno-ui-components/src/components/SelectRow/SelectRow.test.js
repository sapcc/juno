import * as React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SelectRow } from "./index"
import { SelectOption } from "../SelectOption/index"

const mockOnValueChange = jest.fn()
const mockOnOpenChange = jest.fn()

/** Create a Parent component to test functionality and interactions of controlled components. */
const SelectRowParent = ({
	value,
	onChange,
	children,
	...props
}) => {
	const [val, setVal] = React.useState(value)
	
	const handleChange = (v) => {
		onChange()
		setVal(v)
	}
	
	return (
		<SelectRow defaultValue={val} onValueChange={handleChange} {...props}>
			{ children }
		</SelectRow>
	)
}

describe("SelectRow", () => {
	
	afterEach(() => {
		cleanup()
		jest.clearAllMocks()
	})
	
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
		expect(document.querySelector('.juno-required')).toBeInTheDocument()
	})
	
	test("renders a custom class to the row as passed", async () => {
		render(<SelectRow data-testid="select-row" className="my-custom-class" />)
		expect(screen.getByTestId("select-row")).toBeInTheDocument()
		expect(screen.getByTestId("select-row")).toHaveClass("my-custom-class")
	})
	
	test("renders a placeholder in the Select as passed", async () => {
		render(<SelectRow placeholder="my placeholder" />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveTextContent("my placeholder")
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
	
	test("renders a loading SelectRow as passed", async () => {
		render(<SelectRow loading />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveClass("juno-select-loading")
	})
	
	test("renders a SelectRow with an error Select as passed", async () => {
		render(<SelectRow error />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveClass("juno-select-error")
	})
	
	test("renders all props as passed", async () => {
		render(<SelectRow data-testid="select-row" data-lolol="some-prop" />)
		expect(screen.getByTestId("select-row")).toBeInTheDocument()
		expect(screen.getByTestId("select-row")).toHaveAttribute("data-lolol", 'some-prop')
	})
	
	test("renders an open Select as passed", async () => {
		render(
			<SelectRow open>
				<SelectOption value="v-1" label="Value 1" />
				<SelectOption value="v-2" label="Value 2"/>
			</SelectRow>
		)
		expect(screen.getByRole("listbox")).toBeInTheDocument()
		expect(screen.getByRole("option", {name: "Value 1"})).toBeInTheDocument()
		expect(screen.getByRole("option", {name: "Value 2"})).toBeInTheDocument()
	})
	
	test("sets selected option for an uncontrolled Select as passed", () => {
		render(
			<SelectRow defaultValue="v-2">
				<SelectOption value="v-1" label="Value 1" />
				<SelectOption value="v-2" label="Value 2"/>
			</SelectRow>
		)
		expect(screen.getByRole("combobox")).toHaveTextContent("Value 2")
		expect(screen.getByRole("combobox")).not.toHaveTextContent("Value 1")
	})
	
	test("sets selected option for a controlled Select as passed", () => {
		render(
			<SelectRow value="v-2">
				<SelectOption value="v-1" label="Value 1" />
				<SelectOption value="v-2" label="Value 2"/>
			</SelectRow>
		)
		expect(screen.getByRole("combobox")).toHaveTextContent("Value 2")
		expect(screen.getByRole("combobox")).not.toHaveTextContent("Value 1")
	})
	
	test("allows user to open a Select in a SelectRow by clicking on it, showing all children rendered as passed", async () => {
		render(
			<SelectRow onOpenChange={mockOnOpenChange}>
				<SelectOption value="1">Option 1</SelectOption>
				<SelectOption value="2">Option 2</SelectOption>
				<SelectOption value="3">Option 3</SelectOption>
			</SelectRow>
		)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
		await userEvent.click(screen.getByRole("combobox"))
		expect(screen.getByRole("listbox")).toBeInTheDocument()
		expect(screen.getByRole("option", {name: "Option 1"})).toBeInTheDocument()
		expect(screen.getByRole("option", {name: "Option 2"})).toBeInTheDocument()
		expect(screen.getByRole("option", {name: "Option 3"})).toBeInTheDocument()
		expect(mockOnOpenChange).toHaveBeenCalled()
	})
	
	test("allows user to change a value on an uncontrolled SelectRow", async () => {
		render(
			<SelectRow defaultValue="val-1" onValueChange={mockOnValueChange}>
				<SelectOption value="val-1">Option 1</SelectOption>
				<SelectOption value="val-2">Option 2</SelectOption>
				<SelectOption value="val-3">Option 3</SelectOption>
			</SelectRow>
		)
		const select = screen.getByRole("combobox")
		expect(select).toBeInTheDocument()
		expect(select).toHaveTextContent("Option 1")
		await userEvent.click(select)
		expect(screen.getByRole("listbox")).toBeInTheDocument()
		await userEvent.click(screen.getByRole("option", { name: "Option 2" }))
		expect(select).toHaveTextContent("Option 2")
		expect(mockOnValueChange).toHaveBeenCalledWith("val-2")
	})
	
	test("allows user to change a value on a controlled SelectRow", async () => {
		render(
			<SelectRowParent value="v-1" onValueChange={mockOnValueChange}>
				<SelectOption value="v-1" label="Option 1"/>
				<SelectOption value="v-2" label="Option 2"/>
				<SelectOption value="v-3" label="Option 3"/>
			</SelectRowParent>
		)
		const select = screen.getByRole("combobox")
		expect(select).toBeInTheDocument()
		expect(select).toHaveTextContent("Option 1")
		await userEvent.click(select)
		expect(screen.getByRole("listbox")).toBeInTheDocument()
		expect(screen.getByRole("option", {name: "Option 1"})).toBeInTheDocument()
		expect(screen.getByRole("option", {name: "Option 2"})).toBeInTheDocument()
		expect(screen.getByRole("option", {name: "Option 3"})).toBeInTheDocument()
		await userEvent.click(screen.getByRole("option", { name: "Option 2" }))
		expect(select).toHaveTextContent("Option 2")
		expect(mockOnValueChange).toHaveBeenCalled()
	})
	
	
})
