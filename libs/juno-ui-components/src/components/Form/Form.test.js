import * as React from "react"
import { render, screen} from "@testing-library/react"
import { Form } from "./index"

describe("Form", () => {
	
	test("renders a Form", async () => {
		render(<Form data-testid="my-form" />)
		expect(screen.getByTestId("my-form")).toBeInTheDocument()
	})
	
})
