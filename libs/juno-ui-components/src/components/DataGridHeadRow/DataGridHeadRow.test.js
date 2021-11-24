import * as React from "react"
import { render, screen} from "@testing-library/react"
import { DataGridHeadRow } from "./index"

describe("DataGridHeadRow", () => {
	
	test("renders a DataGridHeadRow", async () => {
		const tablehead = document.createElement('thead')
		const {container} = render(<DataGridHeadRow data-testid="my-datagridrow" />, 
			{ container: document.body.appendChild(tablehead)})
		expect(screen.getByTestId("my-datagridrow")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		const tablehead = document.createElement('thead')
		const {container} = render(<DataGridHeadRow data-testid="my-datagridrow" className="my-custom-class"/>, 
			{ container: document.body.appendChild(tablehead)})
		expect(screen.getByTestId("my-datagridrow")).toBeInTheDocument()
		expect(screen.getByTestId("my-datagridrow")).toHaveClass("my-custom-class")
	})
	
})