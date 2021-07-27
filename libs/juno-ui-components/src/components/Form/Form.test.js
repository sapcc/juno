import * as React from "react"
import { render, screen} from "@testing-library/react"
import { Form } from "./index"

describe("Form", () => {
	
	test("renders a Form", async () => {
		render(<Form data-testid="my-form" />)
		expect(screen.getByTestId("my-form")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		render(<Form data-testid="my-form" className="my-custom-class" />)
		expect(screen.getByTestId("my-form")).toBeInTheDocument()
		expect(screen.getByTestId("my-form")).toHaveClass("my-custom-class")
	})
	
})
