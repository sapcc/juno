import * as React from "react"
import { render, screen} from "@testing-library/react"
import { DataGridCell } from "./index"

describe("DataGridCell", () => {
	
	test("renders a DataGridCell", async () => {
		const tablerow = document.createElement('tr')
		const {container} = render(<DataGridCell data-testid="my-datagridcell" />, 
			{ container: document.body.appendChild(tablerow)})
		expect(screen.getByTestId("my-datagridcell")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		const tablerow = document.createElement('tr')
		const {container} = render(<DataGridCell data-testid="my-datagridcell" className="my-custom-class"/>, 
			{ container: document.body.appendChild(tablerow)})
		expect(screen.getByTestId("my-datagridcell")).toBeInTheDocument()
		expect(screen.getByTestId("my-datagridcell")).toHaveClass("my-custom-class")
	})
	
})