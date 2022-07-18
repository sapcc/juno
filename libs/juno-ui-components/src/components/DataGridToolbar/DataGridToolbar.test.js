import * as React from "react"
import { render, screen} from "@testing-library/react"
import { DataGridToolbar } from "./index"

describe("DataGridToolbar", () => {
	
	test("renders a DataGridToolbar", async () => {
		render(<DataGridToolbar data-testid="my-datagridtoolbar" />)
		expect(screen.getByTestId("my-datagridtoolbar")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		render(<DataGridToolbar data-testid="my-datagridtoolbar" className="my-custom-class" />)
		expect(screen.getByTestId("my-datagridtoolbar")).toBeInTheDocument()
		expect(screen.getByTestId("my-datagridtoolbar")).toHaveClass("my-custom-class")
	})
	
})