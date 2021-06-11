import * as React from "react"
import { render, screen} from "@testing-library/react"
import { Select } from "./index"

describe("Select", () => {
	
	test("renders a select element", async () => {
		render(<Select />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
	})
	
	test("renders a select element with a name as passed", async () => {
		render(<Select name="my-select"/>)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveAttribute('name', "my-select")
	})
	
	test("renders a disabled select", async () => {
		render(<Select disabled/>)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveAttribute('disabled')
	})
	
	
})