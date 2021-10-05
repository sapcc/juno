import * as React from "react"
import { render, screen} from "@testing-library/react"
import { GridColumn} from "./index"

describe("GridColumn", () => {
	
	test("renders a Grid row", async () => {
		render(<GridColumn data-testid="my-grid-column" />)
		expect(screen.getByTestId("my-grid-column")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		render(<GridColumn data-testid="my-grid-column" className="my-grid-column-class" />)
		expect(screen.getByTestId("my-grid-column")).toHaveClass("my-grid-column-class")
	})
	
})