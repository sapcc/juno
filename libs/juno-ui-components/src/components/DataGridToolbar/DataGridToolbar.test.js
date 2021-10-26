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
	
	test("renders a searchInput if passed", async () => {
		render(<DataGridToolbar search/>)
		expect(screen.getByRole('searchbox')).toBeInTheDocument()
	})
	
	test("renders a button to add items if passed", async () => {
		render(<DataGridToolbar addItems/>)
		expect(screen.getByTitle('Add Item')).toBeInTheDocument()
	})
	
	test("renders a button to add items with a custom label if passed", async () => {
		render(<DataGridToolbar addItems addItemsLabel={"Add A Thing"}/>)
		expect(screen.getByTitle('Add A Thing')).toBeInTheDocument()
	})
	
})