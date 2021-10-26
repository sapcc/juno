import * as React from "react"
import { render, screen} from "@testing-library/react"
import { DataGridRow } from "./index"

describe("DataGridRow", () => {
	
	test("renders a DataGridRow", async () => {
		const tablebody = document.createElement('tbody')
		const {container} = render(<DataGridRow data-testid="my-datagridrow" />, 
			{ container: document.body.appendChild(tablebody)})
		expect(screen.getByTestId("my-datagridrow")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		const tablebody = document.createElement('tbody')
		const {container} = render(<DataGridRow data-testid="my-datagridrow" className="my-custom-class"/>, 
			{ container: document.body.appendChild(tablebody)})
		expect(screen.getByTestId("my-datagridrow")).toBeInTheDocument()
		expect(screen.getByTestId("my-datagridrow")).toHaveClass("my-custom-class")
	})
	
})