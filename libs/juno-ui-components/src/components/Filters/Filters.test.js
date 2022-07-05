import * as React from "react"
import { render, screen} from "@testing-library/react"
import { Filters } from "./index"

describe("Filters", () => {
	
	test("renders Filters", async () => {
		render(<Filters data-testid="my-filters" />)
		expect(screen.getByTestId("my-filters")).toBeInTheDocument()
		expect(screen.getByTestId("my-filters")).toHaveClass("juno-filters")
	})
	
	test("renders a custom className", async () => {
		render(<Filters data-testid="my-filters" className="my-custom-class" />)
		expect(screen.getByTestId("my-filters")).toBeInTheDocument()
		expect(screen.getByTestId("my-filters")).toHaveClass("my-custom-class")
	})
	
	test("renders all props as passed", async () => {
		render(<Filters data-testid="23" data-lolol={true}/>)
		expect(screen.getByTestId("23")).toBeInTheDocument()
		expect(screen.getByTestId("23")).toHaveAttribute('data-lolol')
	})
	
})