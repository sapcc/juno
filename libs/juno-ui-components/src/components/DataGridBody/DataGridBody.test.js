import * as React from "react"
import { render, screen} from "@testing-library/react"
import { DataGridBody } from "./index"

describe("DataGridBody", () => {
	
	test("renders a DataGridBody", async () => {
		const table = document.createElement('table')
		const {container} = render(<DataGridBody data-testid="my-datagridbody" className="my-custom-class"/>, 
			{ container: document.body.appendChild(table)})
		expect(screen.getByTestId("my-datagridbody")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		const table = document.createElement('table')
		const {container} = render(<DataGridBody data-testid="my-datagridbody" className="my-custom-class"/>, 
			{ container: document.body.appendChild(table)})
		expect(screen.getByTestId("my-datagridbody")).toBeInTheDocument()
		expect(screen.getByTestId("my-datagridbody")).toHaveClass("my-custom-class")
	})
	
})