import * as React from "react"
import { render, screen} from "@testing-library/react"
import { DataGridRow } from "./index"

describe("DataGridRow", () => {
	
	test("renders a DataGridRow", async () => {
		render(<DataGridRow />)
		expect(screen.getByRole("row")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		render(<DataGridRow className="my-custom-class"/>)
		expect(screen.getByRole("row")).toBeInTheDocument()
		expect(screen.getByRole("row")).toHaveClass("my-custom-class")
	})
	
	
})