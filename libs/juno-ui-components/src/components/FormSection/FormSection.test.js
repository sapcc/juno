import * as React from "react"
import { render, screen} from "@testing-library/react"
import { FormSection } from "./index"

describe("FormSection", () => {
	
	test("renders a FormSection", async () => {
		render(<FormSection data-testid="my-formsection" />)
		expect(screen.getByTestId("my-formsection")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		render(<FormSection data-testid="my-formsection" className="my-custom-class" />)
		expect(screen.getByTestId("my-formsection")).toBeInTheDocument()
		expect(screen.getByTestId("my-formsection")).toHaveClass("my-custom-class")
	})
	
})