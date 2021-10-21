import * as React from "react"
import { render, screen} from "@testing-library/react"
import { DataGridCheckboxCell } from "./index"

describe("DataGridCheckboxCell", () => {
	
	test("renders a DataGridCheckboxCell containing a checkbox", async () => {
		const tablerow = document.createElement('tr')
		const {container} = render(<DataGridCheckboxCell data-testid="my-datagridcell" />, 
			{ container: document.body.appendChild(tablerow)})
		expect(screen.getByTestId("my-datagridcell")).toBeInTheDocument()
		expect(screen.getByRole('checkbox')).toBeInTheDocument()
	})
	
	test("renders a DataGridCheckboxCell containing a checked checkbox if passed", async () => {
		const tablerow = document.createElement('tr')
		const {container} = render(<DataGridCheckboxCell data-testid="my-datagridcell" selected />, 
			{ container: document.body.appendChild(tablerow)})
		expect(screen.getByRole('checkbox')).toBeInTheDocument()
		expect(screen.getByRole('checkbox')).toBeChecked()
	})
	
	test("renders a custom className", async () => {
		const tablerow = document.createElement('tr')
		const {container} = render(<DataGridCheckboxCell data-testid="my-datagridcell" className="my-custom-class"/>, 
			{ container: document.body.appendChild(tablerow)})
		expect(screen.getByTestId("my-datagridcell")).toBeInTheDocument()
		expect(screen.getByTestId("my-datagridcell")).toHaveClass("my-custom-class")
	})
	
})