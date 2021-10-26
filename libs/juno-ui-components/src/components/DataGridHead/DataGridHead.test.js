import * as React from "react"
import { render, screen} from "@testing-library/react"
import { DataGridHead } from "./index"

describe("DataGridFoot", () => {
	
	test("renders a DataGridHead", async () => {
		const table = document.createElement('table')
		const {container} = render(<DataGridHead data-testid="my-datagridhead"/>, 
			{ container: document.body.appendChild(table)})
		expect(screen.getByTestId("my-datagridhead")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		const table = document.createElement('table')
		const {container} = render(<DataGridHead data-testid="my-datagridhead" className="my-custom-class"/>, 
			{ container: document.body.appendChild(table)})
		expect(screen.getByTestId("my-datagridhead")).toBeInTheDocument()
		expect(screen.getByTestId("my-datagridhead")).toHaveClass("my-custom-class")
	})
	
})