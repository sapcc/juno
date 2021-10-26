import * as React from "react"
import { render, screen} from "@testing-library/react"
import { DataGridHeadCell } from "./index"

describe("DataGridHeadCell", () => {
	
	test("renders a DataGridHeadCell", async () => {
		const tablerow = document.createElement('tr')
		const {container} = render(<DataGridHeadCell data-testid="my-datagridheadcell" />, 
			{ container: document.body.appendChild(tablerow)})
		expect(screen.getByTestId("my-datagridheadcell")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		const tablerow = document.createElement('tr')
		const {container} = render(<DataGridHeadCell data-testid="my-datagridheadcell" className="my-custom-class"/>, 
			{ container: document.body.appendChild(tablerow)})
		expect(screen.getByTestId("my-datagridheadcell")).toBeInTheDocument()
		expect(screen.getByTestId("my-datagridheadcell")).toHaveClass("my-custom-class")
	})
	
})