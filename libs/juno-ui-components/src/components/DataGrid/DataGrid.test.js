import * as React from "react"
import { render, screen} from "@testing-library/react"
import { DataGrid } from "./index"

describe("DataGrid", () => {
	
	test("renders a DataGrid", async () => {
		render(<DataGrid data-testid="my-datagrid" />)
		expect(screen.getByTestId("my-datagrid")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		render(<DataGrid data-testid="my-datagrid" className="my-custom-class"/>)
		expect(screen.getByTestId("my-datagrid")).toBeInTheDocument()
		expect(screen.getByTestId("my-datagrid")).toHaveClass("my-custom-class")
	})
	
})