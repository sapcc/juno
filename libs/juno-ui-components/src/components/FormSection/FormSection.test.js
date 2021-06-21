import * as React from "react"
import { render, screen} from "@testing-library/react"
import { FormSection } from "./index"

describe("FormSection", () => {
	
	test("renders a FormSection", async () => {
		render(<FormSection data-testid="my-formsection" />)
		expect(screen.getByTestId("my-formsection")).toBeInTheDocument()
	})
	
})