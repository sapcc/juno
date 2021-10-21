import * as React from "react"
import { render, screen} from "@testing-library/react"
import { DataGridFootRow } from "./index"

describe("DataGridFootRow", () => {
	
	test("renders a DataGridFootRow", async () => {
		const tablefoot = document.createElement('tfoot')
		const {container} = render(<DataGridFootRow data-testid="my-datagridrow" />, 
			{ container: document.body.appendChild(tablefoot)})
		expect(screen.getByTestId("my-datagridrow")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		const tablefoot = document.createElement('tfoot')
		const {container} = render(<DataGridFootRow data-testid="my-datagridrow" className="my-custom-class"/>, 
			{ container: document.body.appendChild(tablefoot)})
		expect(screen.getByTestId("my-datagridrow")).toBeInTheDocument()
		expect(screen.getByTestId("my-datagridrow")).toHaveClass("my-custom-class")
	})
	
})