import * as React from "react"
import { render, screen} from "@testing-library/react"
import { DataGridCell } from "./index"

describe("DataGridCell", () => {
	
	test("renders a DataGridCell", async () => {
		render(<DataGridCell />)
		expect(screen.getByRole("gridcell")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		render(<DataGridCell className="my-custom-class"/>)
		expect(screen.getByRole("gridcell")).toBeInTheDocument()
		expect(screen.getByRole("gridcell")).toHaveClass("my-custom-class")
	})
	
	
})