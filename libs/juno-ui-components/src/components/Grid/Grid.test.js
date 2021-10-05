import * as React from "react"
import { render, screen} from "@testing-library/react"
import { Grid} from "./index"

describe("Grid", () => {
	
	test("renders a Grid container", async () => {
		render(<Grid data-testid="my-grid" />)
		expect(screen.getByTestId("my-grid")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		render(<Grid data-testid="my-grid" className="my-grid-class" />)
		expect(screen.getByTestId("my-grid")).toHaveClass("my-grid-class")
	})
	
})